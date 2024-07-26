import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteBookById, getBookById } from "../../services/bookApi";
import Book from "../../models/Book";
import MainNav from "../../components/MainNav/MainNav";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import { useUser } from "../../context/UserContext";

const BookDetails = () => {
  const { user } = useUser();
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>();

  useEffect(() => {
    const getBookDetails = async () => {
      if (bookId) {
        const fetchedBook = await getBookById(bookId);
        if (fetchedBook) {
          setBook(fetchedBook);
        }
      }
    };
    getBookDetails();
  }, []);

  if (!book || !user || user.id === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MainNav />
      <DashboardHeader />
      <div className="p-8 ml-64">
        <h2 className="mb-4 text-2xl font-bold text-center">{book.title}</h2>
        <table className="relative min-w-full leading-normal">
          <button
            onClick={() => deleteBookById(user.id!, book.id)}
            className="absolute px-5 py-2 text-white bg-red-600 rounded-full right-2 -top-14 hover:bg-red-500"
          >
            Remove
          </button>

          <thead>
            <tr>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Property
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                ID
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.id}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Title
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.title}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Subtitle
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.subtitle}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Authors
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.authors}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Publisher
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.publisher}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Published Date
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {String(book.publishedDate)}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Description
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.description}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Page Count
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.pageCount}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Categories
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.categories}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Average Rating
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.averageRating}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Ratings Count
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.ratingsCount}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Maturity Rating
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                {book.maturityRating}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Small Thumbnail
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                <img src={book.smallThumbnail} alt="Small Thumbnail" />
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                Thumbnail
              </td>
              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                <img src={book.thumbnail} alt="Thumbnail" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookDetails;
