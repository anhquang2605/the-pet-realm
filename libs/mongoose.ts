import { MongoNetworkError } from 'mongodb';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file');
}
type MongooseCache = {
  conn : typeof mongoose | null;
  promise : Promise<typeof mongoose> | null;
}
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached: MongooseCache  = global.mongooseCache || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (cached.promise) {
    console.log(MONGODB_URI);
    const conn = await mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => mongoose);
    console.log(conn);
/*     cached.promise = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,

    }).then((mongoose) => mongoose); */
  }
  cached.conn = await cached.promise;
  return cached.conn;
}