import { Request, Response } from "express";
import db from "../db";
import GoogleBook from "../models/GoogleBook";
import Book from "../models/Book";
import { formatDate } from "../utils/formatDate";

export const getAllUserBooks = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const result = await db.query(
    "SELECT * FROM books JOIN userbooks on books.id = userbooks.book_id WHERE userbooks.user_id = (?)",
    [userId]
  );

  const books = result[0] as Book[];

  console.log("Books", books);
  res.status(200).json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  let result = await db.query("SELECT * FROM books WHERE id=(?)", [bookId]);
  console.log(result);

  console.log(result[0]);
  const books = result[0] as Book[];
  console.log("Books", books);
  const book = books[0];
  res.status(200).json(book);
};

export const removeBookFromUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId as string;

  try {
    const deleteResult = await db.query(
      "DELETE FROM userbooks WHERE user_id = ? AND book_id = ?",
      [Number(userId), bookId]
    );

    if ("affectedRows" in deleteResult[0] && deleteResult[0].affectedRows > 0) {
      console.log(
        `Book with ID ${bookId} removed from user with ID ${userId}.`
      );

      const countResult = await db.query(
        "SELECT COUNT(*) AS count FROM userbooks WHERE book_id = ?",
        [bookId]
      );

      if ((countResult[0] as any[])[0].count === 0) {
        const deleteBookResult = await db.query(
          "DELETE FROM books WHERE id = ?",
          [bookId]
        );

        if (
          "affectedRows" in deleteBookResult[0] &&
          deleteBookResult[0].affectedRows > 0
        ) {
          console.log(
            `Book with ID ${bookId} removed from books table as it is no longer in use.`
          );
          res.status(200).json({
            message: "Book removed from user and deleted from catalog.",
          });
        } else {
          res.status(404).json({ message: "Book not found in books table." });
        }
      } else {
        res.status(200).json({ message: "Book removed from user." });
      }
    } else {
      res.status(404).json({ message: "No such book found for this user." });
    }
  } catch (error) {
    console.error("Failed to remove book from user:", error);
    res.status(500).json({ message: "Error processing request" });
  }
};

export const handleAddBookToUser = async (req: Request, res: Response) => {
  const book: GoogleBook = req.body;
  const userId = req.params.userId;

  if (!book || !book.volumeInfo || !book.volumeInfo.title) {
    return res.status(400).json({ message: "Invalid Google Book data" });
  }
  if (!userId) {
    return res.status(400).json({ message: "Missing user ID" });
  }

  try {
    const existingBook = await db.query("SELECT id FROM books WHERE id = ?", [
      book.id,
    ]);
    const existingBookId = (existingBook[0] as any[])[0];

    if (existingBookId?.id) {
      return linkBookToUser(book.id, userId, res);
    } else {
      return insertBookAndLink(book, userId, res);
    }
  } catch (error) {
    console.error("Failed to handle adding book to user:", error);
    res.status(500).json({ message: "Error processing request" });
  }
};

const insertBookAndLink = async (
  book: GoogleBook,
  userId: string,
  res: Response
) => {
  const result = await db.query(
    "INSERT INTO books (id, title, subtitle, authors, publisher, publishedDate, description, pageCount, categories, averageRating, ratingsCount, maturityRating, smallThumbnail, thumbnail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      book.id,
      book.volumeInfo.title,
      book.volumeInfo.subtitle,
      JSON.stringify(book.volumeInfo.authors),
      book.volumeInfo.publisher,
      formatDate(book.volumeInfo.publishedDate),
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

  if ("affectedRows" in result[0] && result[0].affectedRows > 0) {
    return linkBookToUser(book.id, userId, res);
  } else {
    res.status(500).json({ message: "Failed to insert book into books table" });
  }
};

const linkBookToUser = async (
  bookId: string,
  userId: string,
  res: Response
) => {
  const userBookResult = await db.query(
    "INSERT INTO userbooks (user_id, book_id) VALUES (?,?)",
    [userId, bookId]
  );

  if (
    "affectedRows" in userBookResult[0] &&
    userBookResult[0].affectedRows > 0
  ) {
    res.status(201).json({ id: bookId });
  } else {
    res.status(500).json({
      message: "Failed to insert user id and book id into userbooks table",
    });
  }
};
