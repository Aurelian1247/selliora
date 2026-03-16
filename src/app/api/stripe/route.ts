import { NextResponse } from "next/server";
import {
  stripe,
  STRIPE_CREDITS_100_PRICE_ID,
  STRIPE_CREDITS_200_PRICE_ID,
  STRIPE_CREDITS_600_PRICE_ID,
  STRIPE_PRO_PRICE_ID,
} from "../../../lib/stripe/config";
import { createClient } from "@supabase/supabase-js";

function getServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const checkoutType = String(body?.checkoutType || "").trim();
    const accessToken = String(body?.accessToken || "").trim();

    if (!checkoutType) {
      return NextResponse.json(
        { error: "Missing checkout type." },
        { status: 400 }
      );
    }

    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing access token." },
        { status: 401 }
      );
    }

    const supabase = getServerSupabase();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not authenticated." },
        { status: 401 }
      );
    }

    let priceId = "";

    if (checkoutType === "pro") {
      priceId = STRIPE_PRO_PRICE_ID;
    } else if (checkoutType === "credits_100") {
      priceId = STRIPE_CREDITS_100_PRICE_ID;
    } else if (checkoutType === "credits_200") {
      priceId = STRIPE_CREDITS_200_PRICE_ID;
    } else if (checkoutType === "credits_600") {
      priceId = STRIPE_CREDITS_600_PRICE_ID;
    } else {
      return NextResponse.json(
        { error: "Invalid checkout type." },
        { status: 400 }
      );
    }

    const commonMetadata = {
      userId: user.id,
      checkoutType,
    };

    const session = await stripe.checkout.sessions.create({
      mode: checkoutType === "pro" ? "subscription" : "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      metadata: commonMetadata,
      ...(checkoutType === "pro"
        ? {
            subscription_data: {
              metadata: commonMetadata,
            },
          }
        : {
            payment_intent_data: {
              metadata: commonMetadata,
            },
          }),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}