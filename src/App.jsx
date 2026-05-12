import BookList from "./components/BookList.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import AddStar from "./components/AddBook.jsx";
import AddBook from "./components/AddBook.jsx";

function App() {
  return (
    <div className="container mt-4">
      <h1>Biblioteca Piazzalunga</h1>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
