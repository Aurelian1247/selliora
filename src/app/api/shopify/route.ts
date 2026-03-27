import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const shop = url.searchParams.get("shop");
  const userId = url.searchParams.get("userId");

  if (!shop || !userId) {
    return NextResponse.json({ error: "Missing shop or userId" }, { status: 400 });
  }

  const clientId = process.env.SHOPIFY_API_KEY!;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/shopify/callback`;

  const state = Buffer.from(JSON.stringify({ userId })).toString("base64");

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=write_products&redirect_uri=${redirectUri}&state=${state}`;

  return NextResponse.redirect(installUrl);
}