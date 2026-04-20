import crypto from "crypto";

export async function verifyShopifyWebhook(req: Request) {
  const secret = process.env.SHOPIFY_API_SECRET!;

  const rawBody = await req.text();

  const hmacHeader = req.headers.get("x-shopify-hmac-sha256") || "";

  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  const isValid = crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(hmacHeader)
  );

  return { isValid, rawBody };
}