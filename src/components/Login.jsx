import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLogin();
      onClose();
    } catch {
      setError("Credenziali non valide");
    }
  }

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                className="form-control mb-2"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="form-control mb-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="alert alert-danger py-2">{error}</div>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" type="submit">
                Accedi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
