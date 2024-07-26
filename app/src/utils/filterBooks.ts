import Book from "../models/Book";

export const filterBooks = (books: Book[], searchTerm: string) => {
  if (!searchTerm) return books;
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
