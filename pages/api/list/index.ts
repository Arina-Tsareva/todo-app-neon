import { NextApiRequest, NextApiResponse } from "next";

const API_URL = "http://localhost:5000/todos";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const response = await fetch(API_URL);
      const todos = await response.json();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  } else if (req.method === "POST") {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const newTodo = await response.json();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: "Failed to add todo" });
    }
  }
}
