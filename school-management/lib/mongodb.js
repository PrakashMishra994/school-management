import { MongoClient } from "mongodb";

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;

    cached.promise = MongoClient.connect(uri, {}).then((client) => {
      return {
        client,
        db: client.db(dbName),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
