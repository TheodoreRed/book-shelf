import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./context/UserContext.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </UserProvider>
  </React.StrictMode>
);
