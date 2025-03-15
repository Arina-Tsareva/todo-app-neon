import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const openDB = async () => {
  const db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL
    );
  `);

  return db;
};
