import { createContext, ReactNode, useContext, useState } from "react";
import GoogleBook from "../models/GoogleBook";

interface SearchContextType {
  bookSearch: GoogleBook[] | null;
  setBookSearch: React.Dispatch<React.SetStateAction<GoogleBook[] | null>>;
}

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const useBookSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [bookSearch, setBookSearch] = useState<GoogleBook[] | null>(null);

  return (
    <SearchContext.Provider value={{ bookSearch, setBookSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
