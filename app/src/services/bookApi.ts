import axios from "axios";
import GoogleBook from "../models/GoogleBook";

const baseUrl: string = import.meta.env.VITE_GOOGLE_API_URL;

export const addBook = async (book: GoogleBook, userId: number) => {
  try {
    const result = await axios.post(`${baseUrl}/api/book/${userId}`, book);
    return result.data as GoogleBook;
  } catch (error) {
    console.error(error);
  }
};
