import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");
const shop = searchParams.get("shop");

const stateParam = searchParams.get("state");

if (!code || !shop || !stateParam) {
  return NextResponse.json({ error: "Missing params" }, { status: 400 });
}

const decoded = JSON.parse(
  Buffer.from(stateParam, "base64").toString()
);

const userId = decoded.userId;

if (!userId) {
  return NextResponse.json({ error: "Invalid state" }, { status: 400 });
}
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // 🔥 corect aici
  );

  // 🔁 Shopify token
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();
  const accessToken = data.access_token;


// 👇 ADAUGĂ AICI
console.log("USER ID:", userId);
console.log("SHOP:", shop);
console.log("TOKEN:", accessToken);
console.log("SHOPIFY RESPONSE:", data);

  console.log("ACCESS TOKEN:", accessToken);

  // ✅ SALVARE CORECTĂ CU USER REAL
  const { error } = await supabase
    .from("shopify_connections")
    .upsert(
      {
        user_id: userId, // 🔥 AICI E CHEIA
        shop,
        access_token: accessToken,
      },
      {
        onConflict: "user_id,shop",
      }
    );

  console.log("SUPABASE SAVE:", error);

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
}