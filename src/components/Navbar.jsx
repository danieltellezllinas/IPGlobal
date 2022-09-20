import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul>
      <Link to="/">Home</Link>
      <Link to="/mylist">My list</Link>
    </ul>
  );
};

export default Navbar;
