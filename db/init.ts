import { openDB } from "./database";

async function setup() {
  const db = await openDB();
  await db.exec(`
        CREATE TABLE IF NOT EXISTS todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL
        )
    `);
  console.log("Database initialized!");
}

setup();
