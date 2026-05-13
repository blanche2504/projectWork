import BookList from "./components/BookList.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import AddBook from "./components/AddBook.jsx";
import Header from "./components/Header.jsx";

function App() {
    return (
        <div className="container mt-4">
            <Header />
            <BookList />
            <AddBook />
        </div>
    );
}

export default App;
