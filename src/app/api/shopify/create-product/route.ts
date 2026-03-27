import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY:", body); // 👈 AICI

    const { title, description, userId, image } = body;

console.log("USER ID:", userId); // 👈 AICI

    if (!title || !description || !userId) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 🔥 ia conexiunea Shopify pe user REAL
    const { data: connection, error } = await supabase
      .from("shopify_connections")
      .select("*")
      .eq("user_id", userId)
      .limit(1).single();

    if (error || !connection) {
      return NextResponse.json(
        { error: "No Shopify connected" },
        { status: 400 }
      );
    }

    const shop = connection.shop;
    const accessToken = connection.access_token;

    // 🚀 Shopify create product
    const res = await fetch(
      `https://${shop}/admin/api/2024-01/products.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: {
            title,
            body_html: description,
            vendor: "Selliora",
            product_type: "AI Generated",
            status: "active",
             images: image
      ? [
          {
            attachment: image.split(",")[1], // 🔥 scoate base64 header
          },
        ]
      : [],
          },
        }),
      }
    );

    const data = await res.json();

    return NextResponse.json({
  success: true,
  productId: data.product.id, 
  shop, // 🔥 asta trebuie să existe  
});

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}