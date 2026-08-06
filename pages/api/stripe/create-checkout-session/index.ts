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
  });

  res.status(200).json({ clientSecret: session.client_secret });
}