import { headers } from "next/headers";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
export const runtime = "nodejs"; export const dynamic = "force-dynamic";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
export async function POST(req: Request){
  const raw = Buffer.from(await req.arrayBuffer());
  const sig = headers().get("stripe-signature") || "";
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(raw, sig, endpointSecret); }
  catch (err: any) { return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 }); }
  if (event.type === "checkout.session.completed"){
    const s = event.data.object as Stripe.Checkout.Session;
    const email = s.customer_details?.email;
    if (email){
      const users = await clerkClient.users.getUserList({ emailAddress: [email] });
      const user = users?.data?.[0];
      if (user){
        await clerkClient.users.updateUser(user.id, { publicMetadata: { ...(user.publicMetadata || {}), hasPlanReading: true } });
      }
    }
  }
  if (event.type === "charge.refunded"){
    const charge = event.data.object as Stripe.Charge;
    const email = (charge.billing_details?.email || "").toLowerCase();
    if (email){
      const users = await clerkClient.users.getUserList({ emailAddress: [email] });
      const user = users?.data?.[0];
      if (user){
        const meta: any = user.publicMetadata || {}; delete meta.hasPlanReading;
        await clerkClient.users.updateUser(user.id, { publicMetadata: meta });
      }
    }
  }
  return NextResponse.json({ received: true });
}
