import { useState, useEffect } from "react";
import api from "../api.js";

async function fetchCover(titolo, autore) {
  try {
    const query = encodeURIComponent(`${titolo} ${autore}`);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=1&fields=isbn,cover_i`,
    );
    const data = await res.json();
    const doc = data.docs?.[0];
    if (doc?.cover_i) {
      return `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
    }
    if (doc?.isbn?.[0]) {
      return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`;
    }
    return null;
  } catch {
    return null;
  }
}

const FALLBACK_HTML =
  '<div style="display:flex;flex-direction:column;align-items:center;gap:8px;color:#aaa"><span style="font-size:44px">📚</span><small>Copertina non disponibile</small></div>';

function BookCard({ book, cover, onEdit, onDelete, isAuthenticated }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="card border-0 shadow-sm overflow-hidden"
        style={{ cursor: "pointer" }}
        onClick={() => setShowModal(true)}
      >
        <div
          style={{
            aspectRatio: "2/3",
            width: "100%",
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {cover === undefined ? (
            <div className="d-flex flex-column align-items-center gap-2 text-muted">
              <div
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              <small>Caricamento...</small>
            </div>
          ) : cover ? (
            <img
              src={cover}
              alt={`Copertina di ${book.titolo}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onLoad={(e) => {
                if (e.target.naturalWidth <= 1) {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = FALLBACK_HTML;
                }
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML = FALLBACK_HTML;
              }}
            />
          ) : (
            <div className="d-flex flex-column align-items-center gap-2 text-muted">
              <span style={{ fontSize: 44 }}>📚</span>
              <small>Copertina non disponibile</small>
            </div>
          )}
        </div>

        <div className="card-body">
          <h6 className="card-title text-truncate mb-1">{book.titolo}</h6>
          <small className="text-body-secondary">{book.autore}</small>
          <div className="d-flex gap-2 mt-1">
            {book.anno && <span className="badge bg-light text-dark">{book.anno}</span>}
            {book.genere && <span className="badge bg-light text-dark">{book.genere}</span>}
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow overflow-hidden">
              <button
                className="btn-close position-absolute top-0 end-0 m-3"
                style={{ zIndex: 10 }}
                onClick={() => setShowModal(false)}
              />
              <div className="d-flex">
                <div
                  style={{
                    width: 140,
                    minWidth: 140,
                    background: "#f0f0f0",
                    overflow: "hidden",
                  }}
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={`Copertina di ${book.titolo}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onLoad={(e) => {
                        if (e.target.naturalWidth <= 1)
                          e.target.style.display = "none";
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center h-100"
                      style={{ minHeight: 180 }}
                    >
                      <span style={{ fontSize: 36 }}>📚</span>
                    </div>
                  )}
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="fw-semibold mb-1">{book.titolo}</h5>
                  <p className="text-body-secondary mb-1">{book.autore}</p>
                  {(book.anno || book.genere) && (
                    <p className="text-muted mb-2" style={{ fontSize: 13 }}>
                      {[book.anno, book.genere].filter(Boolean).join(" — ")}
                    </p>
                  )}
                  <p
                    className="text-muted flex-grow-1"
                    style={{ fontSize: 14, lineHeight: 1.7 }}
                  >
                    {book.descrizione || "Nessuna descrizione disponibile."}
                  </p>
                  {isAuthenticated && (
                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-sm btn-outline-primary flex-grow-1"
                        onClick={() => {
                          setShowModal(false);
                          onEdit();
                        }}
                      >
                        Modifica
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          setShowModal(false);
                          onDelete();
                        }}
                      >
                        Elimina
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BookList({ isAuthenticated }) {
  const [books, setBooks] = useState([]);
  const [covers, setCovers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (books.length === 0) return;
    books.forEach(async (book) => {
      if (covers[book._id] !== undefined) return;
      const url = await fetchCover(book.titolo, book.autore);
      setCovers((prev) => ({ ...prev, [book._id]: url }));
    });
  }, [books]);

  function fetchBooks() {
    api
      .get("/api/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  async function handleDelete(id) {
    if (!confirm("Sei sicuro di voler eliminare questo libro?")) return;
    try {
      await api.delete(`/api/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
      setCovers((prev) => {
        const c = { ...prev };
        delete c[id];
        return c;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEditSubmit() {
    try {
      await api.put(`/api/books/${editingBook._id}`, {
        titolo: editingBook.titolo,
        autore: editingBook.autore,
        anno: editingBook.anno,
        genere: editingBook.genere,
        descrizione: editingBook.descrizione,
      });
      setBooks((prev) =>
        prev.map((b) => (b._id === editingBook._id ? editingBook : b)),
      );
      const url = await fetchCover(editingBook.titolo, editingBook.autore);
      setCovers((prev) => ({ ...prev, [editingBook._id]: url }));
      setEditingBook(null);
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = books
    .filter(
      (b) =>
        b.titolo?.toLowerCase().includes(search.toLowerCase()) ||
        b.autore?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => a.titolo?.localeCompare(b.titolo));

  if (loading) return <p className="text-center mt-4">Caricamento...</p>;
  if (error)
    return <p className="text-danger text-center mt-4">Errore: {error}</p>;

  return (
    <div>
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
                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Anno di pubblicazione"
                  value={editingBook.anno || ""}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, anno: e.target.value })
                  }
                />
                <input
                  className="form-control mb-2"
                  placeholder="Genere"
                  value={editingBook.genere || ""}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, genere: e.target.value })
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

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca per titolo o autore..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filtered.map((book) => (
          <div className="col" key={book._id}>
            <BookCard
              book={book}
              cover={covers[book._id]}
              isAuthenticated={isAuthenticated}
              onEdit={() => setEditingBook(book)}
              onDelete={() => handleDelete(book._id)}
            />
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
