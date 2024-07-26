import express from "express";
import GoogleBook from "../models/GoogleBook";
import db from "../db";
import {
  getAllUserBooks,
  getBookById,
  handleAddBookToUser,
  removeBookFromUser,
} from "../controllers/booksController";

const bookRouter = express.Router();

bookRouter.post("/books/:userId", handleAddBookToUser);
bookRouter.get("/books/user/:userId", getAllUserBooks);
bookRouter.get("/books/:bookId", getBookById);
bookRouter.delete("/books/:userId/:bookId", removeBookFromUser);

export default bookRouter;
