import {NextApiRequest, NextApiResponse} from 'next';
import { getCollectionFromDB } from '../../../libs/db-interactions';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const collection = await getCollectionFromDB("shipping");
    if(!collection) return res.status(500).json({ message: "Database connection error" });
    switch(req.method) {
        case "GET":
            const shippingData = await collection.find({}).toArray();
            res.status(200).json(shippingData);
            break;    
        case "POST":
            const returnedData = await collection.insertOne(req.body);
            //get id of the inserted payment
            const id = returnedData.insertedId.toString();
            res.status(200).json({ id });
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
    }
    if(req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
    const shippingData = await collection.find({}).toArray();
    res.status(200).json(shippingData);
}