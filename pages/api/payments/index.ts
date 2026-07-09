import {NextApiRequest, NextApiResponse} from 'next';
import { ObjectId } from 'mongodb';
import { getCollectionFromDB } from '../../../libs/db-interactions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const collection = await getCollectionFromDB("payments");
    if(!collection) return res.status(500).json({ message: "Database connection error" });
    if(req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
    const orders = await collection.find({}).toArray();
    res.status(200).json(orders);
}