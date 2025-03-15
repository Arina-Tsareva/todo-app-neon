import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../db/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await openDB();

  if (req.method === "GET") {
    try {
      const todos = await db.all("SELECT * FROM todo ORDER BY id DESC");
      console.log("Todos fetched:", todos);
      res.status(200).json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "Text is required" });

    try {
      const result = await db.run("INSERT INTO todo (text) VALUES (?)", text);
      console.log("Todo added:", { id: result.lastID, text });
      res.status(200).json({ id: result.lastID, text });
    } catch (error) {
      console.error("Error adding todo:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
