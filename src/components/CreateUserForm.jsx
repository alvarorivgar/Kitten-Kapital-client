import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserService } from "../services/admin.services";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import VideoCall from "../pages/VideoCall";

function CreateUserForm() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
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
      const createdUser = await createUserService(newUser);
      navigate(`/create-account/${createdUser.data._id}`);
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
      {/* only show the render if is logged as admin */}
      {isLoggedIn === false || isAdmin === false ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="container">
            <div className="row justify-content-center pt-2 mt-2 m-1">
              <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
                <div className="form-group text-center pt-3">
                  <div>
                    <VideoCall />
                  </div>
                  <div className="form-group text-center pt-3">
                    <h1>Create User</h1>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mx-sm-4 pt-3">
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        value={firstName}
                        placeholder="First Name"
                        onChange={handleFirstNameChange}
                      />
                    </div>

                    <div className="form-group mx-sm-4 pt-3">
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={handleLastNameChange}
                      />
                    </div>
                    <div className="form-group mx-sm-4 pt-3">
                      <input
                        className="form-control"
                        type="text"
                        name="idNumber"
                        value={idNumber}
                        placeholder="Id Number"
                        onChange={handleIdNumberhange}
                      />
                    </div>
                    <div className="form-group mx-sm-4 pt-3">
                      <label class="date-of-birth-text" htmlFor="dob">
                        Date of Birth
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        name="dob"
                        onChange={handleDobChange}
                      />
                    </div>

                    <div className="form-group mx-sm-4 pt-3">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="form-group mx-sm-4 pt-3">
                      <input
                        className="form-control"
                        type="password"
                        name="password1"
                        value={password1}
                        placeholder="Password"
                        onChange={handlePassword1Change}
                      />
                    </div>
                    <div className="form-group mx-sm-4 pt-3">
                      <input
                        className="form-control"
                        type="password"
                        name="password2"
                        value={password2}
                        placeholder="Confirm Password"
                        onChange={handlePassword2Change}
                      />
                    </div>
                    <div className="form-group mx-sm-4 pb-4 pt-4">
                      <input
                        type="submit"
                        className="btn btn-block ingresar"
                        value="Register"
                      ></input>
                    </div>

                    {errorMessage !== "" ? (
                      <p class="date-of-birth-text">{errorMessage}</p>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateUserForm;
