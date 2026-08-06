import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const URL = process.env.NEXT_PUBLIC_BASE_URL;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${URL}?success=true`,
    // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
    integration_identifier: '{{INTEGRATION_ID}}',
  });

  res.redirect(303, session.url as string);
}