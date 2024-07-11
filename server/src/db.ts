import mysql from "mysql2/promise";
import { config as loadEnvFile } from "dotenv";
loadEnvFile();

interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

const dbConfig: DBConfig = {
  host: process.env.DB_HOST ?? "",
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "",
};

const db = mysql.createPool(dbConfig);

async function validateDbConnection() {
  try {
    const connection = await db.getConnection();
    connection.release();
    console.log("Database connection was successful!");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
}

validateDbConnection();

export default db;
