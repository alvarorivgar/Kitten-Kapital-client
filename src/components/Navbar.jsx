import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const navigate = useNavigate()

  const { isLoggedIn, authenticateUser } = useContext(AuthContext)


  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  const handleLogout = () => {
    // Para hacer logout tenemos que eliminar el token y cambiar los estados de isLoggedIn y loggedUser
    localStorage.removeItem("authToken")
    authenticateUser() // Esta funcion automaticamente cambia isLoggedIn y loggedUser cuando no ve el token

    // Redireccion
    navigate("/")
  }

  if(isLoggedIn) {

    return (
      <div>
        <NavLink to="/" style={toggleStyles}>Home</NavLink>
        <span onClick={handleLogout} >Log out</span>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to="/" style={toggleStyles}>Home</NavLink>
        <NavLink to="/login" style={toggleStyles}>Log In</NavLink>
      </div>
    );
  }

}

export default Navbar;
