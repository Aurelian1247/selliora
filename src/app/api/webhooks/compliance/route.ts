import { verifyShopifyWebhook } from "../../../../lib/shopify-hmac";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const shop = req.headers.get("x-shopify-shop-domain") || "";
  const { isValid, rawBodyBuffer, topic } = await verifyShopifyWebhook(req);

  if (!isValid) {
    console.error("❌ Invalid Shopify webhook HMAC", { topic, shop });
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    console.log("✅ Shopify compliance webhook verified");
    console.log("Topic:", topic);
    console.log("Shop:", shop);
    console.log("Payload:", rawBodyBuffer.toString("utf8"));

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Compliance webhook error:", error);
    return new Response("Server error", { status: 500 });
  }
}