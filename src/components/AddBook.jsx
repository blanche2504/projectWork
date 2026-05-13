import { useState } from "react";
import axios from "axios";

function AddBook() {
    const [form, setForm] = useState({ titolo: "", autore: "" });
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
            const response = await axios.post(
                "http://localhost:3000/api/books",
                {
                    ...form,
                },
            );

            setMessage(response.data.message);
            setForm({ titolo: "", autore: "" });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="mb-4">
            <h2 className="mb-3">Aggiungi un libro</h2>
            <form onSubmit={handleSubmit} className="d-flex gap-2">
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
                <button className="btn btn-primary" type="submit">
                    Aggiungi
                </button>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
        </section>
    );
}

export default AddBook;
