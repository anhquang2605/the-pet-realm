//get admin info from mongo db database and return it to the client
import { getCollectionFromDB } from "../../../libs/db-interactions";

export default async function handler(req: any, res: any) {
    const adminCollection = await getCollectionFromDB("admins");
    if(!adminCollection) return res.status(500).json({ message: "Database connection error" });
    const admin = await adminCollection.findOne({ email: req.body.email });
    if(!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
}