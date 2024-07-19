import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../models/User";
import { getAuthenticatedUser } from "../services/authApi";
import { getUserBooks } from "../services/bookApi";
import Book from "../models/Book";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[] | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const UserProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[] | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const userData = await getAuthenticatedUser();
      setUser(userData);
      if (userData && userData.id) {
        const userBooks = await getUserBooks(userData.id);
        if (userBooks) {
          setBooks(userBooks);
        }
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, books, setBooks }}>
      {children}
    </UserContext.Provider>
  );
};
