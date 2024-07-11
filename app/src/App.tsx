import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
