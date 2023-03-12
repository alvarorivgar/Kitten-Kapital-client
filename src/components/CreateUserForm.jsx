import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserService } from "../services/admin.services";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function CreateUserForm() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useContext(AuthContext)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleIdNumberhange = (e) => setIdNumber(e.target.value);
  const handleDobChange = (e) => setDob(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassword1Change = (e) => setPassword1(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      idNumber,
      dob,
      email,
      password1,
      password2,
    };

    try {
      
      await createUserService(newUser);
      navigate("/login");
    } catch (error) {
      console.log(error)
      // vamos a determinar el tipo de error que recibimos, y actuar diferente
      console.log(error.response.status); // codigo de error enviado
      console.log(error.response.data.errorMessage); // el mensaje de error que dio el fallo
      if (error.response.status === 400) {
        // mostramos al usuario como solventar el problema
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (

    
    <div>
      {/* only show the render if is logged like admin */}
      {isLoggedIn === false && isAdmin === false ? <Navigate to="/login" />:
        <div>
          <h3>Creatre User</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <br />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
            />
            <br />
            <label htmlFor="idNumber">Id Number</label>
            <input
              type="text"
              name="idNumber"
              value={idNumber}
              onChange={handleIdNumberhange}
            />
            <br />
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              // value={dob}
              onChange={handleDobChange}
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <br />
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              name="password1"
              value={password1}
              onChange={handlePassword1Change}
            />
            <br />
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={handlePassword2Change}
            />
            <br />
            {errorMessage !== "" ? <p>{errorMessage}</p> : null}
            <br />
            <button type="submit">Agregar</button>
          </form>
        </div>
       }

    </div>
  );
}

export default CreateUserForm;
