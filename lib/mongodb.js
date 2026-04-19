import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

/** @type {Promise<MongoClient | null> | null} */
let clientPromise = null;

function getClientPromise() {
  if (!uri) return null;
  if (process.env.NODE_ENV === "development") {
    const g = globalThis;
    if (!g._mongoClientPromise) {
      const client = new MongoClient(uri);
      g._mongoClientPromise = client.connect();
    }
    return g._mongoClientPromise;
  }
  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getResponsesCollection() {
  const promise = getClientPromise();
  if (!promise) return null;
  const client = await promise;
  const dbName = process.env.MONGODB_DB || "master_recherche";
  return client.db(dbName).collection("responses");
}
