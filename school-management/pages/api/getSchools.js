import { connectToDatabase } from "../../lib/mongodb";


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const schools = await db.collection("schools").find({}).toArray();
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schools" });
  }
}
