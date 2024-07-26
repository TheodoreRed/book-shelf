import { useUser } from "../../context/UserContext";
import GoogleBook from "../../models/GoogleBook";
import { addBook, getUserBooks } from "../../services/bookApi";
import defaultBook from "../../assets/default-book.jpg";
import "./GoogleBookCard.css";

interface Props {
  googleBook: GoogleBook;
}

const GoogleBookCard = ({ googleBook }: Props) => {
  const { user, books, setBooks } = useUser();

  const hasBook = () => {
    if (!books) {
      return false;
    }

    return books.some((book) => book.id === googleBook.id);
  };

  if (!user || !user.id) {
    return;
  }
  const setBooksToState = async () => {
    const books = await getUserBooks(user?.id!);
    if (books) {
      setBooks(books);
    }
  };
  const defaultImgStyles = "w-1/2";

  return (
    <li className="p-10 border-8 GoogleBookCard">
      <img
        src={googleBook.volumeInfo.imageLinks?.thumbnail ?? defaultBook}
        alt={`Thumbnail image for ${googleBook.volumeInfo.title}`}
        className={
          googleBook.volumeInfo.imageLinks?.thumbnail ? "" : defaultImgStyles
        }
      />
      <div className="flex flex-col justify-between gap-3 book-content">
        <h2>{googleBook.volumeInfo.title}</h2>
        <p>{googleBook.volumeInfo.authors}</p>
        <div className="add-btn-container">
          {hasBook() ? (
            <button className="px-6 py-2 bg-green-400 border border-black rounded-full cursor-default">
              Added
            </button>
          ) : (
            <button
              className="px-6 py-2 border border-black rounded-full hover:bg-slate-300"
              onClick={async () => {
                await addBook(googleBook, user?.id!);
                await setBooksToState();
              }}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default GoogleBookCard;
