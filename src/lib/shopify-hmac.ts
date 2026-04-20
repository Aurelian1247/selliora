import crypto from "crypto";

export async function verifyShopifyWebhook(req: Request) {
  const rawBody = await req.text();
  const hmacHeader = req.headers.get("x-shopify-hmac-sha256") || "";
  const secret = process.env.SHOPIFY_API_SECRET || "";

  if (!secret || !hmacHeader) {
    return { isValid: false, rawBody, topic: req.headers.get("x-shopify-topic") || "" };
  }

  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  const isValid = digest === hmacHeader;

  return {
    isValid,
    rawBody,
    topic: req.headers.get("x-shopify-topic") || "",
  };
}