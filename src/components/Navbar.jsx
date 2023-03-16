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
          <NavLink to="/admin/user-search" style={toggleStyles}><span>Client Search</span> <img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/search_updqvr.png" alt="search" /></NavLink>
          <NavLink to="/admin/create-user" style={toggleStyles}><span>New User</span><img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/new-user_xm0kdl.png" alt="new user" /></NavLink>
          <NavLink to="/admin/my-clients" style={toggleStyles}><span>My clients</span><img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/my-clients_d4ed4h.png" alt="my clients" /></NavLink>
          <span className="logout" onClick={handleLogout} >Log out </span><img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/logout_afmsp6.png" alt="logout" onClick={handleLogout} />
        </div>
      );
    } else {
      // User Navbar
      return (
        <div id="user-navbar" className="navbar">
          <NavLink to="/user/" style={toggleStyles}>
            <span>Home</span> <img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/home_xi0kvf.png" alt="home" />
          </NavLink>
          <NavLink to="/transaction/create" style={toggleStyles}>
            <span>Transfer</span><img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/transfer_ljso3w.png" alt="transfer" />
          </NavLink>
          <NavLink to="/user/profile" style={toggleStyles}>
            <span>Profile</span><img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/profile_ikuktp.png" alt="profile" />
          </NavLink>
          <span className="logout" onClick={handleLogout}>Log out</span><img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/logout_afmsp6.png" alt="logout" onClick={handleLogout}/>
        </div>
      );
    }
  } else {
    // Anon Navbar
    return (
      <div className="navbar" id="anon-navbar">
        <div>
          <img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/logo_cfooha.png" alt="logo" id="anon-logo" />
        </div>
        <div className="navlinks">
          <NavLink to="/" style={toggleStyles}>
          <span>Home</span> <img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/home_xi0kvf.png" alt="home" />
          </NavLink>
          <NavLink to="/login" style={toggleStyles}>
            <span>Log In</span><img src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/login_jpmqtb.png" alt="login" />
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Navbar;
