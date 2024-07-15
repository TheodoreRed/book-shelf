import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getAuthenticatedUser, logout } from "../../services/authApi";
import { useEffect, useState } from "react";

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuthentication = async () => {
      setLoading(true);
      try {
        const userData = await getAuthenticatedUser();
        setUser(userData);
        console.log(userData);
        if (!userData) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    initializeAuthentication();
  }, [navigate, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
    <header className="flex flex-col h-screen bg-gray-100 shadow-xl w-fit">
      <div className="p-8 border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faBook} className="text-4xl text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-700">Book Shelf</h2>
        </div>
      </div>
      <nav>
        <ul className="flex flex-col">
          <NavLink
            to="/my-books"
            className={({ isActive }) =>
              isActive ? `bg-gray-200 ${listStyles}` : `${listStyles}`
            }
          >
            <li>My Books</li>
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? `bg-gray-200 ${listStyles}` : `${listStyles}`
            }
          >
            <li>Favorites</li>
          </NavLink>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
