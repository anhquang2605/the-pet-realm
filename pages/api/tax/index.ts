import {NextApiRequest, NextApiResponse} from "next";
import { getCollectionFromDB } from "../../../libs/db-interactions";
import { ObjectId } from "mongodb";
import Stripe from "stripe";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    const method = req.method;
    switch (method) {
        case "GET":
            res.status(200).json({ message: "GET request received" });
            break;
        case "POST":
            const { shipping, productid } = req.body;
            if (!shipping || !productid) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const orderCollection = await getCollectionFromDB("orders");
            if (!orderCollection) {
                return res.status(500).json({ message: "Database connection error" });
            }
            const priceamount = await orderCollection.findOne({ _id: new ObjectId(productid) }, { projection: { price: 1, discount: 1 } });
            if (!priceamount) {
                return res.status(404).json({ message: "Product not found" });
            }
            const calculation = await stripe.tax.calculations.create({
                currency: 'usd',

                line_items: [
                    {
                        product: productId,
                        quantity: 1,
                        amount: priceamount.price - (priceamount.discount * priceamount.price ),
                    },
                ],
                customer_details: {
                    address: {
                        city: shipping.city,
                        country: shipping.country,
                        line1: shipping.address,
                        postal_code: shipping.postalCode,
                        state: shipping.state,
                    },
                }
            })
            res.status(200).json({ message: "POST request received", calculation });
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
    }
}