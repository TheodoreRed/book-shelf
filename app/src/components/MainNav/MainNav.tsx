import { faBook, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getAuthenticatedUser, logout } from "../../services/authApi";
import { useEffect, useState } from "react";
import { getUserBooks } from "../../services/bookApi";

const MainNav = () => {
  const { setUser, books, setBooks } = useUser();
  const navigate = useNavigate();
  const [_loading, setLoading] = useState(true);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  useEffect(() => {
    const initializeAuthentication = async () => {
      setLoading(true);
      try {
        const userData = await getAuthenticatedUser();
        setUser(userData);
        if (!userData) {
          handleGoogleLogin();
        }
        if (userData && userData.id) {
          const userBooks = await getUserBooks(userData.id);
          if (userBooks) {
            setBooks(userBooks);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        handleGoogleLogin();
      } finally {
        setLoading(false);
      }
    };

    initializeAuthentication();
  }, [navigate, setUser]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const listStyles = "text-blue-600 text-xl hover:bg-gray-200 pt-5 pb-5 pl-5";
  return (
    <header className="fixed top-0 left-0 flex flex-col h-screen bg-gray-100 shadow-xl w-fit">
      <div className="p-8 border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faBook} className="text-4xl text-blue-600" />
          <h2
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-bold text-gray-700 cursor-pointer"
          >
            Book Shelf
          </h2>
        </div>
      </div>
      <nav>
        <ul className="flex flex-col">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `bg-gray-200 ${listStyles}` : `${listStyles}`
            }
          >
            <li>My Books {`(${books?.length})`}</li>
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? `bg-gray-200 ${listStyles}` : `${listStyles}`
            }
          >
            <li className="flex flex-row items-center gap-3">
              <p>Search</p>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="scale-x-[-1]"
              />
            </li>
          </NavLink>
        </ul>
        <div className="flex flex-col items-center mt-10">
          <button
            className="px-4 py-2 text-black rounded-md bg-gradient-to-b from-blue-400 to-blue-200 hover:from-blue-500 hover:to-blue-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default MainNav;
