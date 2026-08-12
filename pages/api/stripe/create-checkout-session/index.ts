import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const URL = process.env.URL;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { amount } = req.body;
    const session = await stripe.checkout.sessions.create({
       ui_mode: 'embedded_page',
    line_items: [
    {
      price_data: {
        currency: 'usd',
        unit_amount: amount,
        product_data: {
          name: 'Single Purchase',
        }
      },
      quantity: 1,
    }
    ],
    mode: 'payment',
   return_url: `${URL}/order-confirmation`,
  });
  res.status(200).json({ clientSecret: session.client_secret });
}