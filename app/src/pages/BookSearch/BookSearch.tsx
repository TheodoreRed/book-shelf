import { FormEvent, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import MainNav from "../../components/MainNav/MainNav";
import GoogleBook from "../../models/GoogleBook";
import { getBooksBySearch } from "../../services/googleBookApi";
import { addBook } from "../../services/bookApi";
import { useUser } from "../../context/UserContext";

const BookSearch = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<GoogleBook[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Assuming getBooksBySearch is an async function that fetches books data
      const results = await getBooksBySearch(searchTerm);
      if (results) {
        setBooks(results);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (!user || !user.id) {
    return;
  }

  return (
    <div className="flex flex-col">
      <MainNav />
      <DashboardHeader />
      <div className="flex flex-col items-center">
        <div className="ml-64 ">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-row items-center gap-3 right-20"
          >
            <input
              type="text"
              placeholder="Enter book title"
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full px-5 py-2 mt-5 border border-black"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 mt-5 text-white bg-blue-500 rounded-md"
            >
              Search
            </button>
          </form>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {books?.map((book, index) => (
                <li key={index}>
                  {book.volumeInfo.title} - {book.volumeInfo.authors}
                  <button onClick={() => addBook(book, user?.id!)}>
                    Add to Library
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
