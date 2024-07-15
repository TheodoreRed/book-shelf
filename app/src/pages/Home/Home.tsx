import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-yellow-900">
      <header>
        <nav>
          <Link to="/login">
            <button className="absolute px-6 py-2 text-xs font-bold text-white transition duration-300 ease-in-out bg-orange-500 rounded md:text-sm md:static top-4 right-2 hover:bg-orange-700">
              Client Portal
            </button>
          </Link>
        </nav>
      </header>
      <h1>Home works</h1>
    </div>
  );
};

export default Home;
