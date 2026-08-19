import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getFromPOSTAPI } from "../../../../libs/api-interactions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const URL = process.env.URL;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { shipping } = req.body;
    const orderAmount = await getOrderAmount(req.body.orderId);

    const session = await stripe.checkout.sessions.create({
       ui_mode: 'embedded_page',
    line_items: [
    {
      price_data: {
        currency: 'usd',
        unit_amount: orderAmount,
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
const getOrderAmount = async (orderId: string) => {
    // Fetch the order from your database using the orderId
    const orderData = await getFromPOSTAPI('/api/orders', { id: orderId, partialFields: ['amount'] });
      return orderData.amount;
}