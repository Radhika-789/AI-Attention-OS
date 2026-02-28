// frontend/src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          background: rgba(60, 45, 140, 0.55);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .navbar-logo-icon {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08));
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 9px;
          display: grid;
          place-items: center;
          font-size: 16px;
        }
        .navbar-logo-text {
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 10px;
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .nav-link:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .nav-link.active {
          background: rgba(255,255,255,0.18);
          color: #fff;
        }
      `}</style>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">🧠</div>
          <span className="navbar-logo-text">AI Attention OS</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            📋 Dashboard
          </Link>
          <Link to="/pomodoro" className={`nav-link ${pathname === "/pomodoro" ? "active" : ""}`}>
            🍅 Pomodoro
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;


// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <Link to="/">Dashboard</Link>
//       <Link to="/pomodoro">Pomodoro</Link>
//     </nav>
//   );
// }

// export default Navbar;