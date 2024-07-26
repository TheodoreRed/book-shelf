import { FormEvent, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import MainNav from "../../components/MainNav/MainNav";
import { getBooksBySearch } from "../../services/googleBookApi";
import { useUser } from "../../context/UserContext";
import { useBookSearch } from "../../context/SearchContext";
import GoogleBookCard from "../../components/GoogleBookCard/GoogleBookCard";
import "./BookSearch.css";

const BookSearch = () => {
  const { user } = useUser();
  const { bookSearch, setBookSearch } = useBookSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const results = await getBooksBySearch(searchTerm);
      if (results) {
        setBookSearch(results);
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
        {bookSearch && (
          <button
            onClick={() => setBookSearch([])}
            className="absolute z-10 px-5 py-2 text-white bg-gray-700 rounded-md right-24 hover:bg-gray-500 top-16"
          >
            Clear
          </button>
        )}
        <div className="ml-64">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-row items-center justify-center gap-3 right-20"
          >
            <input
              type="text"
              placeholder="Enter book title"
              value={searchTerm}
              onChange={handleInputChange}
              className="w-1/3 px-5 py-2 mt-5 border border-black rounded-md min-w-max"
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
            <ul className="mt-10 search-ul">
              {bookSearch?.map((book) => (
                <GoogleBookCard key={book.id} googleBook={book} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
