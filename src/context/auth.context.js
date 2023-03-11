import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  // Estados de auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [IsKitty, setIsKitty] = useState(false)

  // Funciones de auth

  // - contactar al backend para verificar el token
  const authenticateUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false);

      // Checking if token is admin
      response.data.role === "admin" ? setIsAdmin(true) : setIsAdmin(false)

      // Checking if token is user
      response.data.role === "user" ? setIsUser(true) : setIsUser(false)

      // Checking if token is admin
      response.data.role === "kitty" ? setIsKitty(true) : setIsKitty(false)

    } catch (error) {
      setIsAdmin(false)
      setIsUser(false)
      setIsKitty(false)
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);

      console.log(error);
    }
  };

  useEffect(() => {
    authenticateUser(); // Autentica cuando entras a la pagina o la refrescas
  }, []);

  const passedContext = {
    isAdmin,
    isUser,
    IsKitty,
    isLoggedIn,
    loggedUser,
    authenticateUser,
  };

  if (isFetching) {
    return (
      <div className="App">
        <h2>Validating user...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
