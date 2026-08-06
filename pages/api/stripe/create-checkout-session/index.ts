import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const URL = process.env.URL;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await stripe.checkout.sessions.create({
    line_items: [
    {
      price_data: {
        currency: 'usd',
        unit_amount: 2000,
        product_data: {
          name: 'Single Purchase',
        }
      },
      quantity: 1,
    }
    ],
    mode: 'payment',
    success_url: `${URL}?success=true`,
    // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
    integration_identifier: '{{INTEGRATION_ID}}',
  });

  res.status(200).json({ clientSecret: session.client_secret });
}