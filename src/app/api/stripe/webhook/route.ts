import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe/config";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "../../../../lib/email/sendEmail";
import { SubscriptionEmail } from "../../../../lib/email/templates/subscription";

function getServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.error("Missing stripe-signature");
    return new NextResponse("Missing stripe-signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const checkoutType = session.metadata?.checkoutType;

      if (!userId || !checkoutType) {
        console.error("Missing metadata in session:", session.metadata);
        return new NextResponse("Missing metadata", { status: 400 });
      }

      const supabase = getServerSupabase();

      if (checkoutType === "pro") {
        const { error } = await supabase
          .from("user_usage")
          .update({
            plan_type: "pro",
            monthly_products_used: 0,
            monthly_product_limit: 100,
            last_monthly_reset_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (error) {
          console.error("Failed to update Pro plan:", error);
          return new NextResponse("DB update failed", { status: 500 });
        }

        // === EMAIL CONFIRMATION FOR PRO PLAN ===
        const customerEmail = session.customer_details?.email;

        if (customerEmail) {
          const emailTemplate = SubscriptionEmail({
            name: "there",
            plan: "Pro Plan",
          });

          await sendEmail({
            to: customerEmail,
            subject: "Your Selliora AI plan is active 🚀",
            react: emailTemplate,
          });
        }
      }

      const creditsMap: Record<string, number> = {
        credits_100: 100,
        credits_200: 200,
        credits_600: 600,
      };

      if (checkoutType in creditsMap) {
        const creditsToAdd = creditsMap[checkoutType];

        const { data: current, error: fetchError } = await supabase
          .from("user_usage")
          .select("credits_balance")
          .eq("id", userId)
          .single();

        if (fetchError || !current) {
          console.error("Failed to fetch current credits:", fetchError);
          return new NextResponse("DB fetch failed", { status: 500 });
        }

        const newBalance = (current.credits_balance || 0) + creditsToAdd;

        const { error: updateError } = await supabase
          .from("user_usage")
          .update({
            credits_balance: newBalance,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (updateError) {
          console.error("Failed to update credits:", updateError);
          return new NextResponse("DB update failed", { status: 500 });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handling error:", error);
    return new NextResponse("Webhook error", { status: 500 });
  }
}