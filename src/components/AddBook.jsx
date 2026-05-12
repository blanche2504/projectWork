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
      const response = await axios.post("http://localhost:3000/api/books", {
        ...form,
      });

      setMessage(response.data.message);
      setForm({ titolo: "", autore: "" });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="titolo"
          placeholder="Titolo"
          value={form.titolo}
          onChange={handleChange}
        />
        <input
          name="autore"
          placeholder="Autore"
          value={form.autore}
          onChange={handleChange}
        />
        <button type="submit">+</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}

export default AddBook;
