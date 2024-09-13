import { MongoClient, ServerApiVersion } from "mongodb";

async function connectDB() {
  const uri =
    "mongodb+srv://root:ghVncyknVfzbg9GU@cluster0.nbtjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      useUnifiedTopology: true,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  return client;
}

export async function insertDoc(collection, document) {
  const client = await connectDB();
  try {
    const db = client.db("newsletter");
    const result = await db.collection(collection).insertOne(document);
    return result;
  } finally {
    await client.close();
  }
}

export async function queryDoc(collection) {
  const client = await connectDB();
  try {
    const db = client.db("newsletter");
    const result = await db
      .collection(collection)
      .find()
      .sort({ _id: -1 })
      .toArray();
    return result;
  } finally {
    await client.close();
  }
}
