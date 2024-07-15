import express from "express";
import GoogleBook from "../models/GoogleBook";
import db from "../db";

const bookRouter = express.Router();

bookRouter.post("/book/:userId", async (req, res) => {
  try {
    const book: GoogleBook = req.body;
    const userId = req.params.userId;
    if (!book || !book.volumeInfo || !book.volumeInfo.title) {
      return res.status(400).json({ message: "Invalid Google Book data" });
    }
    if (!userId) {
      return res.status(400).json({ message: "Missing user ID" });
    }
    const result = await db.query(
      "INSERT INTO books (id, title, subtitle, authors, publisher, publishedDate, description, pageCount, categories, averageRating, ratingsCount, maturityRating, smallThumbnail, thumbnail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        book.id,
        book.volumeInfo.title,
        book.volumeInfo.subtitle,
        JSON.stringify(book.volumeInfo.authors),
        book.volumeInfo.publisher,
        book.volumeInfo.publishedDate,
        book.volumeInfo.description,
        book.volumeInfo.pageCount,
        JSON.stringify(book.volumeInfo.categories),
        book.volumeInfo.averageRating,
        book.volumeInfo.ratingsCount,
        book.volumeInfo.maturityRating,
        book.volumeInfo.imageLinks?.smallThumbnail,
        book.volumeInfo.imageLinks?.thumbnail,
      ]
    );

    if (
      result &&
      result[0] &&
      "affectedRows" in result[0] &&
      result[0].affectedRows > 0
    ) {
      const userBookResult = await db.query(
        "INSERT INTO userbooks (user_id, book_id) VALUES (?,?)",
        [userId, book.id]
      );
      if (
        userBookResult &&
        userBookResult[0] &&
        "affectedRows" in userBookResult[0] &&
        userBookResult[0].affectedRows > 0
      ) {
        res.status(201).json(book);
      } else {
        res.status(500).json({
          message: "Failed to insert user id and book id into userbooks table",
        });
      }
    } else {
      res
        .status(500)
        .json({ message: "Failed to insert book into books table" });
    }
  } catch (error) {
    console.error("Failed to insert data:", error);
    res.status(500).json({ message: "Error inserting data into database" });
  }
});

export default bookRouter;
