import { Order } from "../types/order";
import { connectDB } from "./mongodb";

export async function getCollectionFromDB(db: string){
    const database = await connectDB();
    try{
        if(!database){
            console.log("No database connected");
            return null;
        } 
        const collection = database.collection(db);
        return collection;
    }
    catch(e){
        console.log(e);
    }
}