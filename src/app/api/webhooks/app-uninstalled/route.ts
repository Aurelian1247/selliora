import { verifyShopifyWebhook } from "../../../../lib/shopify-hmac";

export async function POST(req: Request) {
  const { isValid, rawBody } = await verifyShopifyWebhook(req);

  if (!isValid) {
    return new Response("Unauthorized", { status: 401 });
  }

  console.log("Webhook OK:", rawBody);

  return new Response("ok", { status: 200 });
}