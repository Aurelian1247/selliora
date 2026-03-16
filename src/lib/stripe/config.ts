import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const STRIPE_PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID!;
export const STRIPE_CREDITS_100_PRICE_ID =
  process.env.STRIPE_CREDITS_100_PRICE_ID!;
export const STRIPE_CREDITS_200_PRICE_ID =
  process.env.STRIPE_CREDITS_200_PRICE_ID!;
export const STRIPE_CREDITS_600_PRICE_ID =
  process.env.STRIPE_CREDITS_600_PRICE_ID!;