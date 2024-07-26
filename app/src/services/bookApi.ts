import axios from "axios";
import GoogleBook from "../models/GoogleBook";
import Book from "../models/Book";

const baseUrl: string = import.meta.env.VITE_API_URL;

export const addBook = async (book: GoogleBook, userId: number) => {
  try {
    const result = await axios.post(`${baseUrl}/api/books/${userId}`, book);
    return result.data as GoogleBook;
  } catch (error) {
    console.error(error);
  }
};

export const getUserBooks = async (userId: number) => {
  try {
    const result = await axios.get(`${baseUrl}/api/books/user/${userId}`);
    console.log("GET USER BOOKS:", result.data);
    result.data;
    return result.data as Book[];
  } catch (error) {
    console.error(error);
  }
};

export const getBookById = async (bookId: string) => {
  try {
    const result = await axios.get(`${baseUrl}/api/books/${bookId}`);
    return result.data as Book;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBookById = async (userId: number, bookId: string) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/books/${userId}/${bookId}`
    );
    console.log(response);
    if (response.status === 200) {
      window.location.href = "/dashboard";
    } else {
      console.error(
        "Failed to delete book:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error(error);
  }
};
