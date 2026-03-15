import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const checkDBConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log(`MySQL Connected to DB: ${process.env.DB_NAME}`);
     connection.release()

  } catch (err) {
    console.error("DB connection failed", err);
  }
};

checkDBConnection();
export default db;
