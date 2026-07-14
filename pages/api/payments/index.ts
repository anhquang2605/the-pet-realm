import {NextApiRequest, NextApiResponse} from 'next';
import { ObjectId } from 'mongodb';
import { getCollectionFromDB } from '../../../libs/db-interactions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const collection = await getCollectionFromDB("payments");
    if(!collection) return res.status(500).json({ message: "Database connection error" });
    switch(req.method) {
        case "GET":
            const payments = await collection.find({}).toArray();
            res.status(200).json(payments);
            break;
        case "POST":
            const payment = await collection.insertOne(req.body);
            //get id of the inserted payment
            const id = payment.insertedId.toString();
            res.status(200).json({ id });
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
    
    }

}
