import { useState, useEffect } from "react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = books.filter(
    (b) =>
      b.titolo.toLowerCase().includes(search.toLowerCase()) ||
      b.autore.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center mt-4">Caricamento...</p>;
  if (error) return <p className="text-danger text-center mt-4">Errore: {error}</p>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca per titolo o autore..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filtered.map((book) => (
          <div className="col" key={book._id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{book.titolo}</h5>
                <h6 className="card-subtitle text-body-secondary">{book.autore}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted mt-4">Nessun libro trovato.</p>
      )}
    </div>
  );
}

export default BookList;
