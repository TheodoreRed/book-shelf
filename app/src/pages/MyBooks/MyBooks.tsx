import { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import MainNav from "../../components/MainNav/MainNav";
import SingleBook from "../../components/SingleBook/SingleBook";
import { useUser } from "../../context/UserContext";
import { filterBooks } from "../../utils/filterBooks";

const MyBooks = () => {
  const { books } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books ? filterBooks(books, searchTerm) : [];

  if (!books) {
    return (
      <div className="w-screen">
        <MainNav />
        <DashboardHeader />
        <p>Loading Spinner</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row">
        <MainNav />

        <div className="flex flex-col w-screen">
          <DashboardHeader />
          <form className="flex items-center justify-center gap-3 mt-3">
            <label htmlFor="search">Filter</label>
            <input
              className="h-full p-2 border border-black rounded-md"
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <ul className="flex flex-row flex-wrap gap-10 p-10 ml-64">
            {filteredBooks.map((book) => (
              <SingleBook book={book} key={book.id} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyBooks;
