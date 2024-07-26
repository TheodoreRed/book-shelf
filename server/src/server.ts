import express from "express";
import path from "path";
import logger from "./middleware/logger";
import db from "./db";
import { setupGoogleStrategy } from "./config/passportSetup";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import AuthRouter from "./routes/AuthRouter";
import bookRouter from "./routes/BookRouter";
import cors from "cors";
import { config as loadEnvFile } from "dotenv";
loadEnvFile();

const app = express();
const port = process.env.PORT || 3000;

setupGoogleStrategy();

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(logger);
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../app/dist")));

app.use("/auth", AuthRouter);
app.use("/api", bookRouter);

app.post("/api/insert-test", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Missing the name for the test_table" });
    }
    const result = await db.query("INSERT INTO test_table (name) VALUES (?)", [
      name,
    ]);
    res.status(200).json({ message: "Record inserted successfully", result });
  } catch (error) {
    console.error("Failed to insert data:", error);
    res.status(500).json({ message: "Error inserting data into database" });
  }
});

app.get("/api/hello", (_req, res) => {
  res.send({ message: "Hello from the backend!" });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../app/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
