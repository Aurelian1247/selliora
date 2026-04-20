import { verifyShopifyWebhook } from "../../../../lib/shopify-hmac";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { isValid, rawBodyBuffer, topic } = await verifyShopifyWebhook(req);

  if (!isValid) {
    return new Response("Unauthorized", { status: 401 });
  }

  console.log("Webhook OK:", topic, rawBodyBuffer.toString("utf8"));

  return new Response("OK", { status: 200 });
}