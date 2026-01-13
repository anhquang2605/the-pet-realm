//get admin info from mongo db database and return it to the client
import { NextApiRequest, NextApiResponse } from "next";
import { getCollectionFromDB } from "../../../libs/db-interactions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const adminCollection = await getCollectionFromDB("admins");
    if(!adminCollection) return res.status(500).json({ message: "Database connection error" });
    if(req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });
    const admin = await adminCollection.findOne({ email: req.query.email });
    
    if(!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
}