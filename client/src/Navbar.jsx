import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Lob API to DB</h1>
      </Link>
      <div className="links">
        <Link to="/users">Users</Link>

        <Link to="/events">Events</Link>
        <Link to="/Login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
