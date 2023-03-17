import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";
import { BallTriangle } from "react-loading-icons";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isKitty, setIsKitty] = useState(false);
  const [isUserOrKitty, setIsUserOrKitty] = useState(false);

  const authenticateUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false);

      // Checking if token is admin
      response.data.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);

      // Checking if token is user
      response.data.role === "user" ? setIsUser(true) : setIsUser(false);

      // Checking if token is kitty
      response.data.role === "kitty" ? setIsKitty(true) : setIsKitty(false);

      // Checking if token is not admin
      response.data.role === "kitty" || response.data.role === "user"
        ? setIsUserOrKitty(true)
        : setIsUserOrKitty(false);
    } catch (error) {
      setIsAdmin(false);
      setIsUser(false);
      setIsKitty(false);
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);
      setIsUserOrKitty(false);
      console.log(error);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const passedContext = {
    isAdmin,
    isUser,
    isKitty,
    isLoggedIn,
    loggedUser,
    isUserOrKitty,
    authenticateUser,
  };

  if (isFetching) {
    return (
      <div className="App">
        <BallTriangle />
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
