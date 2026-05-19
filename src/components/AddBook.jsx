import { useState } from "react";
import api from "../api.js";

function AddBook() {
    const [form, setForm] = useState({ titolo: "", autore: "", anno: "", genere: "" });
    const [message, setMessage] = useState("");

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await api.post("/api/books", { ...form });

            setMessage(response.data.message);
            setForm({ titolo: "", autore: "", anno: "", genere: "" });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="mb-4">
            <h2 className="mb-3">Aggiungi un libro</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
                <div className="d-flex gap-2">
                    <input
                        className="form-control"
                        name="titolo"
                        placeholder="Titolo"
                        value={form.titolo}
                        onChange={handleChange}
                    />
                    <input
                        className="form-control"
                        name="autore"
                        placeholder="Autore"
                        value={form.autore}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex gap-2">
                    <input
                        className="form-control"
                        name="anno"
                        type="number"
                        placeholder="Anno di pubblicazione"
                        value={form.anno}
                        onChange={handleChange}
                    />
                    <input
                        className="form-control"
                        name="genere"
                        placeholder="Genere"
                        value={form.genere}
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary" type="submit">
                        Aggiungi
                    </button>
                </div>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
        </section>
    );
}

export default AddBook;
