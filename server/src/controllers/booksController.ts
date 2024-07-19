import { Request, Response } from "express";
import db from "../db";
import GoogleBook from "../models/GoogleBook";
import Book from "../models/Book";

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
  const books = result[0] as GoogleBook[];
  console.log("Books", books);
  const book = books[0];
  res.status(200).json(book);
};
// SELECT * FROM books
// JOIN userbooks ON books.id = userbooks.book_id
// WHERE userbooks.user_id = 2;
