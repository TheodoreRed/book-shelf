import axios from "axios";
import GoogleBook from "../models/GoogleBook";

const baseUrl: string = import.meta.env.VITE_GOOGLE_API_URL;

export const getBooksBySearch = async (search: string) => {
  const googleBooks: GoogleBook[] = (
    await axios.get(`${baseUrl}volumes?q=${encodeURIComponent(search)}`)
  ).data.items;
  return googleBooks;
};

export const getBookById = async (bookId: string) => {
  const googleBook: GoogleBook = (
    await axios.get(`${baseUrl}volumes/${encodeURIComponent(bookId)}`)
  ).data;
  return googleBook;
};

export const getBooksByCategory = async (category: string) => {
  const googleBooks: GoogleBook[] = (
    await axios.get(
      `${baseUrl}volumes?q=subject:${encodeURIComponent(category)}`
    )
  ).data.items;
  return googleBooks;
};

export const getBooksByAuthor = async (author: string) => {
  const googleBooks: GoogleBook[] = (
    await axios.get(
      `${baseUrl}volumes?q=inauthor:${encodeURIComponent(author)}`
    )
  ).data.items;
  return googleBooks;
};
