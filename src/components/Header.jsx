export default function Header({ isAuthenticated, onLogout, onShowLogin }) {
  return (
    <header className="d-flex align-items-center justify-content-between">
      <div>
        <img src="favicon.png" alt="logo" />{" "}
        <span className="titolo">Biblioteca Piazzalunga</span>
      </div>
      <div>
        {isAuthenticated ? (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={onShowLogin}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
