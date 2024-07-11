import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className=" bg-red-500">Home works</h1>
      <nav>
        <Link to="/login">
          <button className="absolute px-6 py-2 text-xs font-bold text-white transition duration-300 ease-in-out bg-orange-500 rounded md:text-sm md:static top-4 right-2 hover:bg-orange-700">
            Client Portal
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
