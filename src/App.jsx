import { useState } from "react";
import BookList from "./components/BookList.jsx";
import AddBook from "./components/AddBook.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  function handleLogin() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  return (
    <div className="container mt-4">
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onShowLogin={() => setShowLogin(true)}
      />
      <BookList isAuthenticated={isAuthenticated} />
      <hr />
      {isAuthenticated ? (
        <AddBook />
      ) : (
        <p className="text-muted text-center">
          Effettua il login per aggiungere, modificare o eliminare libri.
        </p>
      )}
      {showLogin && <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default App;
