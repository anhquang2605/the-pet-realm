import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2500, // $25.00
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  if (!paymentIntent) {
    return res.status(500).json({ error: "Failed to create payment intent" });
  }
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
}