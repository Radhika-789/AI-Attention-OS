import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Dashboard</Link>
      <Link to="/pomodoro">Pomodoro</Link>
    </nav>
  );
}

export default Navbar;