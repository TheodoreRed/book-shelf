import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import MainNav from "../../components/MainNav/MainNav";
import SingleBook from "../../components/SingleBook/SingleBook";
import { useUser } from "../../context/UserContext";

const MyBooks = () => {
  const { books } = useUser();

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
          <form className="">
            <label htmlFor="search"></label>
            <input className="h-full" type="text" id="search" />
          </form>
          <ul className="flex flex-row flex-wrap gap-3 p-10 ml-64">
            {books.map((book) => (
              <SingleBook book={book} key={book.id} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyBooks;
