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

      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser();

      navigate("/user");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-5 mt-5 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
          <form onSubmit={handleLogin}>
            <div className="form-group text-center pt-3">
              <h1>Log In</h1>
            </div>

            <div className="form-group mx-sm-4 pt-3">
              <input
                className="form-control"
                type="text"
                name="idNumber"
                value={idNumber}
                placeholder="ID"
                onChange={handleIdNumberChange}
              />
            </div>

            <div className="form-group mx-sm-4 pt-3">
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group mx-sm-4 pb-4 pt-4">
              <input
                type="submit"
                className="btn btn-block ingresar"
                value="Login"
              ></input>
            </div>

            {errorMessage !== "" ? <p>{errorMessage}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
