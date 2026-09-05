import { Collection } from "mongodb";
import { connectDB } from "./mongodb";

export async function getCollectionFromDB(db: string){
    const database = await connectDB();
    try{
        if(!database){
            console.log("No database connected");
            return null;
        } 
        const collection: Collection = database.collection(db);
        return collection;
    }
    catch(e){
        console.log(e);
    }
}