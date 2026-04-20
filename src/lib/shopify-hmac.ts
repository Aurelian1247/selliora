import crypto from "crypto";

export async function verifyShopifyWebhook(req: Request) {
  const rawBody = await req.text();

  const hmacHeader = req.headers.get("x-shopify-hmac-sha256") || "";

  const generatedHash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET!)
    .update(rawBody, "utf8")
    .digest("base64");

  const isValid =
    crypto.timingSafeEqual(
      Buffer.from(generatedHash),
      Buffer.from(hmacHeader)
    );

  return { isValid, rawBody };
}