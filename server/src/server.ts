import express from "express";
import path from "path";
import logger from "./middleware/logger";
import db from "./db";

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../app/dist")));

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
