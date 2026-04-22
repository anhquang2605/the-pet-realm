import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "../../../types/order";
import { getCollectionFromDB } from "../../../libs/db-interactions";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;
    const ordersCollection = await getCollectionFromDB("orders");
    if(!ordersCollection) return res.status(500).json({ message: "Database connection error" });

}