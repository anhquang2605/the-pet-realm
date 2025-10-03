import { MongoClient, Db, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the connection
  // is preserved across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri || '', options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

let db: Db;
export async function connectDB() {
    try{
        if(db) return db;
        await client.connect();
        // Send a ping to confirm a successful connection
        db = await client.db(DB);  
        return db;
    } catch (e) {
        console.log(e);
    }
}

export default clientPromise;