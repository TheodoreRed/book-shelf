import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import MyBooks from "./pages/MyBooks/MyBooks";
import Landing from "./pages/Landing/Landing";
import BookSearch from "./pages/BookSearch/BookSearch";
import BookDetails from "./pages/BookDetails/BookDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<MyBooks />} />
        <Route path="/search" element={<BookSearch />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
