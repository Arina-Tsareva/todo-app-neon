import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../db/database";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const db = await openDB();
      const todos = await db.all("SELECT * FROM todo");
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  } else if (req.method === "POST") {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    try {
      const db = await openDB();
      const result = await db.run("INSERT INTO todo (text) VALUES (?)", text);
      res.status(201).json({ id: result.lastID, text });
    } catch (error) {
      res.status(500).json({ error: "Failed to add todo" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default handler;
