import {NextApiRequest, NextApiResponse} from 'next';
import { getCollectionFromDB } from '../../../libs/db-interactions';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const collection = await getCollectionFromDB("shipping");
    if(!collection) return res.status(500).json({ message: "Database connection error" });
    if(req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
    const shippingData = await collection.find({}).toArray();
    res.status(200).json(shippingData);
}