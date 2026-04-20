import { verifyShopifyWebhook } from "../../../../lib/shopify-hmac";

export async function POST(req: Request) {
  const topic = req.headers.get("x-shopify-topic") || "";
  const shop = req.headers.get("x-shopify-shop-domain") || "";

  const { isValid, rawBody } = await verifyShopifyWebhook(req);

  if (!isValid) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    console.log("✅ Shopify compliance webhook received");
    console.log("Topic:", topic);
    console.log("Shop:", shop);
    console.log("Payload:", rawBody);

    // aici ulterior poți trata separat fiecare topic
    switch (topic) {
      case "customers/data_request":
        break;

      case "customers/redact":
        break;

      case "shop/redact":
        break;

      default:
        break;
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Compliance webhook error:", error);
    return new Response("Server error", { status: 500 });
  }
}