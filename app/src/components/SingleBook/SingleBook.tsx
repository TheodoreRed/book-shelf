import Book from "../../models/Book";

interface Props {
  book: Book;
}

const SingleBook = ({ book }: Props) => {
  return (
    <div
      key={book.id}
      className="w-1/4 p-4 border border-gray-300 rounded-lg shadow-md"
    >
      <img
        src={book.thumbnail}
        alt={book.title}
        className="object-contain w-full h-48 mb-4 rounded-md"
      />
      <h3 className="mb-2 text-lg font-semibold">{book.title}</h3>
      <p className="mb-2 text-gray-600">
        {JSON.parse(book.authors).join(", ")}
      </p>
    </div>
  );
};

export default SingleBook;
