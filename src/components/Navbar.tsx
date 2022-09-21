import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar__global_div">
      <Link to="/">Home</Link>
      <Link to="/mylist">My list</Link>
    </div>
  );
};

export default Navbar;
