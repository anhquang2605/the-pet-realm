import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.MONGO_DB as string;
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
  if (cached.promise === null) {
    
    const conn = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    dbName: DB_NAME
    }).then((mongoose) => mongoose);
    cached.promise = conn;
  }
  cached.conn = await cached.promise;
  return cached.conn;
}