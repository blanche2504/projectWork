import { useState, useEffect } from "react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  function fetchBooks() {
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
  }

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  async function handleDelete(id) {
    if (!confirm("Sei sicuro di voler eliminare questo libro?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`);
      setBooks(books.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/books/${editingBook._id}`, {
        titolo: editingBook.titolo,
        autore: editingBook.autore,
        descrizione: editingBook.descrizione,
      });
      setBooks(books.map((b) => (b._id === editingBook._id ? editingBook : b)));
      setEditingBook(null);
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = books.filter(
    (b) =>
      b.titolo?.toLowerCase().includes(search.toLowerCase()) ||
      b.autore?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="text-center mt-4">Caricamento...</p>;
  if (error)
    return <p className="text-danger text-center mt-4">Errore: {error}</p>;

  return (
    <div>
      {/* Modifica */}
      {editingBook && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifica libro</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditingBook(null)}
                />
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Titolo"
                  value={editingBook.titolo}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, titolo: e.target.value })
                  }
                />
                <input
                  className="form-control mb-2"
                  placeholder="Autore"
                  value={editingBook.autore}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, autore: e.target.value })
                  }
                />
                <textarea
                  className="form-control"
                  placeholder="Descrizione"
                  rows={3}
                  value={editingBook.descrizione || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      descrizione: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingBook(null)}
                >
                  Annulla
                </button>
                <button className="btn btn-primary" onClick={handleEditSubmit}>
                  Salva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barra di ricerca */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca per titolo o autore..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Lista libri */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filtered.map((book) => (
          <div className="col" key={book._id}>
            <div className="card h-100 shadow-sm border-0">
              <div
                className="card-body"
                style={{ cursor: "pointer" }}
                onClick={() => toggleExpand(book._id)}
              >
                <h5 className="card-title">{book.titolo}</h5>
                <h6 className="card-subtitle text-body-secondary mb-2">
                  {book.autore}
                </h6>
                {expandedId === book._id && (
                  <>
                    <p className="card-text mt-2 text-muted">
                      {book.descrizione || "Nessuna descrizione disponibile."}
                    </p>
                    <div className="card-footer bg-transparent border-0 d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setEditingBook(book)}
                      >
                        Modifica
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(book._id)}
                      >
                        Elimina
                      </button>
                    </div>
                  </>
                )}
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
