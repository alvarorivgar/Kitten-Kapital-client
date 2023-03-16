import { useContext, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ChangeEmail from "../components/ChangeEmail";
import ChangePassword from "../components/ChangePassword";
import ChangeImage from "../components/ChangeImage";
import { AuthContext } from "../context/auth.context";
import {
  editUserEmailService,
  editUserImageService,
  editUserPasswordService,
  getUserService,
} from "../services/user.services";
import { BallTriangle } from "react-loading-icons";

function Profile() {
  const navigate = useNavigate();
  const { loggedUser, authenticateUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isEmailFormShowing, setIsEmailFormShowing] = useState(false);
  const [isPasswordFormShowing, setIsPasswordFormShowing] = useState(false);
  const [isImageFormShowing, setIsImageFormShowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const foundUser = await getUserService(loggedUser._id);
      setUser(foundUser.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changeImage = async (image) => {
    try {
      const response = await editUserImageService(user._id, image);
      setIsImageFormShowing(!isImageFormShowing);
      setUser(response.data);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const changeEmail = async (email) => {
    try {
      const response = await editUserEmailService(user._id, email);
      setIsEmailFormShowing(!isEmailFormShowing);
      setUser(response.data);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const changePassword = async (password1, password2) => {
    try {
      await editUserPasswordService(user._id, password1, password2);
      setIsPasswordFormShowing(!isPasswordFormShowing);

      //Force logout
      localStorage.removeItem("authToken");
      authenticateUser();
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isFetching) {
    return <BallTriangle />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
          <img src={user.image} alt="profile pic" id="profile-pic" />
          <button
            onClick={() => setIsImageFormShowing(!isImageFormShowing)}
            className="btn btn-block ingresar"
          >
            ✎
          </button>
          <Collapse in={isImageFormShowing}>
            <div>
              <ChangeImage changeImage={changeImage} />
            </div>
          </Collapse>
          <br />
          <br />
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <br />
          <p>Email: {user.email}</p>
          <button
            onClick={() => setIsEmailFormShowing(!isEmailFormShowing)}
            className="btn btn-block ingresar edit-btn"
          >
            Change email
          </button>
          <Collapse in={isEmailFormShowing}>
            <div>
              <ChangeEmail changeEmail={changeEmail} />
            </div>
          </Collapse>
          <br />
          <br />
          <p>Date of Birth: {user.dob}</p>
          <br />
          <p>Client type: {user.role}</p>
          <br />
          <p>Manager: {user.manager.fullName}</p>
          <br />
          <button
            onClick={() => setIsPasswordFormShowing(!isPasswordFormShowing)}
            className="btn btn-block ingresar"
          >
            Change Password
          </button>
          <Collapse in={isPasswordFormShowing}>
            <div>
              <ChangePassword changePassword={changePassword} />
            </div>
          </Collapse>

          <br />
          {errorMessage !== "" ? <p>{errorMessage}</p> : null}
          <br />
        </div>
      </div>
    </div>
  );
}

export default Profile;
