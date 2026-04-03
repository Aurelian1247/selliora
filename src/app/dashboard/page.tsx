"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";

type Stats = {
  total: number;
  csv: number;
  image: number;
  manual: number;
};

type HistoryItem = {
  id: string;
  product_name: string;
  generation_source: string;
  created_at: string;
};

export default function DashboardOverview() {
  const [blogLanguage, setBlogLanguage] = useState("English");

  // 🔥 ADAUGAT — NU AFECTEAZĂ NIMIC EXISTENT
  async function connectShopify() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("You are not logged in.");
    return;
  }

  const shop = prompt("Enter your Shopify store (ex: mystore.myshopify.com)");
if (!shop) return;

  window.location.href = `/api/shopify?shop=${shop}&userId=${user.id}`;
}

// 🔥 BLOG TEST FUNCTION
async function createTestBlog() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Not logged in");
    return;
  }

  const { data: connection } = await supabase
    .from("shopify_connections")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!connection) {
    alert("Shopify not connected");
    return;
  }
// 🔥 GENERARE AI BLOG
const aiRes = await fetch("/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    apiKey: process.env.NEXT_PUBLIC_API_KEY, // sau cum ai tu
    productName: "Blog article",
   features: `Write a high-quality SEO blog article in ${blogLanguage}. Make it engaging, well-structured, and conversion-focused.`,
    language: blogLanguage,
  }),
});

const aiData = await aiRes.json();

const generatedTitle = aiData.seoTitle || "AI Blog";
const generatedContent = `<p>${aiData.longDescription}</p>`;
  const res = await fetch("/api/shopify/create-blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shop: connection.shop,
      accessToken: connection.access_token,
      title: generatedTitle,
content: generatedContent,
    }),
  });

  const data = await res.json();

  console.log(data);
  alert("Blog created 🚀 Check your Shopify");
}


  const [stats, setStats] = useState<Stats>({
    total: 0,
    csv: 0,
    image: 0,
    manual: 0,
  });

  const [showShopifyHelp, setShowShopifyHelp] = useState(false);
  const [recent, setRecent] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("generation_history")
        .select("id, product_name, generation_source, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const rows = data || [];

      setStats({
        total: rows.length,
        csv: rows.filter((r) => r.generation_source === "csv").length,
        image: rows.filter((r) => r.generation_source === "image").length,
        manual: rows.filter((r) => r.generation_source === "manual").length,
      });

      setRecent(rows.slice(0, 5));
      setLoading(false);
    };

    loadDashboard();
  }, []);

  return (
    <div className="space-y-6">

      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-violet-300/80">
          Overview
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Selliora AI dashboard
        </h2>

        {/* 🔥 ADAUGAT — BUTON CONNECT SHOPIFY */}
        <div className="mt-4 flex gap-3 items-center">
  <button
    onClick={connectShopify}
    className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
  >
    Connect Shopify
  </button>

  <button
  onClick={createTestBlog}
  className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:opacity-90"
>
  Create Blog Post in Shopify
</button>

  <button
    onClick={() => setShowShopifyHelp(true)}
    className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
  >
    How to connect
  </button>
</div>

<select
  value={blogLanguage}
  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
    setBlogLanguage(e.target.value)
  }
  className="mt-3 bg-black/30 border border-white/20 text-white px-3 py-2 rounded-lg text-sm"
>
  <option value="English">🇬🇧 English</option>
  <option value="Romanian">🇷🇴 Romanian</option>
  <option value="French">🇫🇷 French</option>
  <option value="German">🇩🇪 German</option>
  <option value="Spanish">🇪🇸 Spanish</option>
  <option value="Italian">🇮🇹 Italian</option>
  <option value="Portuguese">🇵🇹 Portuguese</option>
  <option value="Dutch">🇳🇱 Dutch</option>
  <option value="Polish">🇵🇱 Polish</option>
  <option value="Czech">🇨🇿 Czech</option>
  <option value="Hungarian">🇭🇺 Hungarian</option>
  <option value="Turkish">🇹🇷 Turkish</option>
  <option value="Russian">🇷🇺 Russian</option>
  <option value="Ukrainian">🇺🇦 Ukrainian</option>
  <option value="Arabic">🇸🇦 Arabic</option>
  <option value="Hindi">🇮🇳 Hindi</option>
  <option value="Chinese">🇨🇳 Chinese</option>
  <option value="Japanese">🇯🇵 Japanese</option>
  <option value="Korean">🇰🇷 Korean</option>
</select>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
          Track your product generation activity, imports and AI usage.
        </p>
      </section>

      {loading ? (
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 text-sm text-white/60">
          Loading dashboard...
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Total generations
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.total}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                CSV imports
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.csv}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Image generations
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.image}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Manual generations
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.manual}
              </p>
            </div>

          </div>

          <section className="rounded-[30px] border border-white/10 bg-white/5 p-6">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Recent generations
              </h3>
            </div>

            {recent.length === 0 ? (
              <p className="text-sm text-white/60">
                No generations yet.
              </p>
            ) : (
              <div className="space-y-3">

                {recent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-white">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-white/50">
                        {item.generation_source}
                      </p>
                    </div>

                    <p className="text-xs text-white/50">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}

              </div>
            )}

          </section>
        </>

      )}


{showShopifyHelp && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    
    <div className="bg-[#0b0f1a] rounded-2xl p-6 w-full max-w-lg border border-white/10 shadow-2xl relative">

      {/* CLOSE */}
      <button
        onClick={() => setShowShopifyHelp(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center font-bold text-black">
          S
        </div>
        <h2 className="text-xl font-semibold text-white">
          Connect your Shopify store
        </h2>
      </div>

      {/* STEPS */}
      <div className="space-y-4 text-gray-300 text-sm leading-relaxed">

        <div>
  <span className="text-white font-medium">1.</span> Enter your Shopify store domain  
  <div className="text-gray-500 text-xs mt-1">
    You can find it in Shopify Admin → top left, under your store name  
    <br />
    Example: <span className="text-white">yourstore.myshopify.com</span>
  </div>
</div>

        <div>
          <span className="text-white font-medium">2.</span> You will be redirected to Shopify
        </div>

        <div>
          <span className="text-white font-medium">3.</span> Click <span className="text-white">"Install app"</span>
        </div>

        <div>
          <span className="text-white font-medium">4.</span> Done! Your store is now connected 🚀
        </div>

        <div className="text-yellow-400 text-xs mt-2">
          ⚠️ Make sure you are logged into your Shopify admin
        </div>

      </div>

      {/* OPTIONAL GIF PLACE */}
      {/* 
      <div className="mt-5 rounded-lg overflow-hidden border border-white/10">
        <img src="/shopify-demo.gif" alt="Shopify demo" />
      </div>
      */}

      {/* BUTTON */}
      <button
        onClick={() => setShowShopifyHelp(false)}
        className="mt-6 w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
      >
        Got it
      </button>

    </div>
  </div>
)}

    </div>
  );
}