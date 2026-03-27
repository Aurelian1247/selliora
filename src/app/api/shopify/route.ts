import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const shop = searchParams.get("shop");
  const userId = searchParams.get("user_id");

  if (!shop || !userId) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/shopify/callback`;

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=write_products&redirect_uri=${redirectUri}&state=${userId}`;

  return NextResponse.redirect(installUrl);
}