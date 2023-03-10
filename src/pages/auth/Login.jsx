import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleIdNumberChange = (e) => setIdNumber(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      idNumber,
      password,
    };

    try {
      const response = await loginService(user);

      // Recibir el token del backen y almacenarlo
      localStorage.setItem("authToken", response.data.authToken);

      // Establecer el contexto para decirle a toda la app que el usuario esta activo
      authenticateUser();

      // Redireccion
      navigate("/");
      
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>ID:</label>
        <input
          type="idNumber"
          name="idNumber"
          value={idNumber}
          onChange={handleIdNumberChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
