import { MongoClient } from "mongodb";

export default function storeQuery(question: string) {
  const client = new MongoClient(process.env.MONGODB_URI!);
  const namespace = "share-on.queries";
  const [dbName, collectionName] = namespace.split(".");
  const collection = client.db(dbName).collection(collectionName);
  collection.insertOne({ query: question });
}