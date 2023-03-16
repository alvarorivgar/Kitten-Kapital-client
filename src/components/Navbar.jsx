import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();

  const { isLoggedIn, authenticateUser, loggedUser } = useContext(AuthContext);

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
    color: "white"
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  if (isLoggedIn) {
    if (loggedUser.role === "admin") {
      // Admin Navbar
      return (
        <div id="admin-navbar" className="navbar">
          <NavLink to="/admin/user-search" style={toggleStyles}><span>Client Search</span> <img src="../images/search.PNG" alt="search" /></NavLink>
          <NavLink to="/admin/create-user" style={toggleStyles}><span>New User</span></NavLink>
          <NavLink to="/admin/my-clients" style={toggleStyles}><span>My clients</span></NavLink>
          <span className="logout" onClick={handleLogout} >Log out</span>
        </div>
      );
    } else {
      // User Navbar
      return (
        <div id="user-navbar" className="navbar">
          <NavLink to="/user/" style={toggleStyles}>
            Home
          </NavLink>
          <NavLink to="/transaction/create" style={toggleStyles}>
            Transfer
          </NavLink>
          <NavLink to="/user/profile" style={toggleStyles}>
            Profile
          </NavLink>
          <span className="logout" onClick={handleLogout}>Log out</span>
        </div>
      );
    }
  } else {
    // Anon Navbar
    return (
      <div className="navbar" id="anon-navbar">
        <div>
          <img src="../../public/images/logo.png" alt="logo" id="anon-logo" />
        </div>
        <div className="navlinks">
          <NavLink to="/" style={toggleStyles}>
            Home
          </NavLink>
          <NavLink to="/login" style={toggleStyles}>
            Log In
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Navbar;
