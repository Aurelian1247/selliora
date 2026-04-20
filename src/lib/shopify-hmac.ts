import crypto from "crypto";

export async function verifyShopifyWebhook(req: Request) {
  const rawBodyBuffer = Buffer.from(await req.arrayBuffer());
  const hmacHeader = req.headers.get("x-shopify-hmac-sha256") || "";
  const topic = req.headers.get("x-shopify-topic") || "";
  const secret = process.env.SHOPIFY_API_SECRET || "";

  if (!secret || !hmacHeader) {
    return { isValid: false, rawBodyBuffer, topic };
  }

  const generatedHmac = crypto
    .createHmac("sha256", secret)
    .update(rawBodyBuffer)
    .digest("base64");

  try {
    const generatedBuffer = Buffer.from(generatedHmac, "base64");
    const headerBuffer = Buffer.from(hmacHeader, "base64");

    if (generatedBuffer.length !== headerBuffer.length) {
      return { isValid: false, rawBodyBuffer, topic };
    }

    const isValid = crypto.timingSafeEqual(generatedBuffer, headerBuffer);

    return { isValid, rawBodyBuffer, topic };
  } catch {
    return { isValid: false, rawBodyBuffer, topic };
  }
}