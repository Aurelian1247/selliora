import crypto from "crypto";

export async function verifyShopifyWebhook(req: Request) {
  const rawBody = await req.text();
  const hmacHeader = req.headers.get("x-shopify-hmac-sha256") || "";
  const secret = process.env.SHOPIFY_API_SECRET || "";

  if (!secret || !hmacHeader) {
    return { isValid: false, rawBody };
  }

  const generatedHmac = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  try {
    const generatedBuffer = Buffer.from(generatedHmac, "base64");
    const headerBuffer = Buffer.from(hmacHeader, "base64");

    if (generatedBuffer.length !== headerBuffer.length) {
      return { isValid: false, rawBody };
    }

    const isValid = crypto.timingSafeEqual(generatedBuffer, headerBuffer);

    return { isValid, rawBody };
  } catch {
    return { isValid: false, rawBody };
  }
}