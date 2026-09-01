import {NextApiRequest, NextApiResponse} from "next";
import Stripe from "stripe";
import { getCollectionFromDB } from "../../../../libs/db-interactions";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tax, orderId } = req.body;
    console.log(tax, orderId);
    if(!tax || !orderId) return res.status(400).json({ message: "Missing required fields" });
    const orderCollection = await getCollectionFromDB("orders");
    console.log(orderCollection);
    if(!orderCollection) return res.status(500).json({ message: "Database connection error" });
    const order = await orderCollection.findOne({ _id: new ObjectId(orderId) });
    if(!order) return res.status(404).json({ message: "Order not found" });
    const amount = Math.round((order.amount *(1 - (order.discount || 0)) + tax) * 100); // Convert to cents 
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
}