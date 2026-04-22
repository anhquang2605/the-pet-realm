import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "../../../types/order";
import { getCollectionFromDB } from "../../../libs/db-interactions";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;
    const ordersCollection = await getCollectionFromDB("orders");
    if(!ordersCollection) return res.status(500).json({ message: "Database connection error" });
    ordersCollection.aggregate([
        {
            $search: {
                index: "the-pet-realm-orders-search",
                autocomplete: {
                    query: query,
                    path: "name",
                    fuzzy: {
                        maxEdits: 1,
                        prefixLength: 1
                    }
                }
            }
        }
    ])
}