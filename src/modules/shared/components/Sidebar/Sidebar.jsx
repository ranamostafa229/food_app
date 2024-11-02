import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column ">
      <Link to="/dashboard">Home</Link>
      <Link to="users">Users</Link>
      <Link to="recipes">Recipes</Link>
      <Link to="categories">Categories</Link>
      <Link to="/">Login</Link>
    </div>
  );
};

export default Sidebar;
