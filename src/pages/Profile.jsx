import { useContext, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import ChangeEmail from "../components/ChangeEmail";
import ChangePassword from "../components/ChangePassword";
import { AuthContext } from "../context/auth.context";
import { editUserDetailsService, getUserService } from "../services/user.services";

function Profile() {
  const { loggedUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isEmailFormShowing, setIsEmailFormShowing] = useState(false);
  const [isPasswordFormShowing, setIsPasswordFormShowing] = useState(false);
  const [isImageFormShowing, setIsImageFormShowing] = useState(false);

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

  const changeEmail = async (email) => {
    await editUserDetailsService(user._id, email);
  }

  if (isFetching) {
    return <h2>Spinner...</h2>;
  }

  return (
    <div>
      <img src={user.image} alt="profile pic" />
      <button
        onClick={() => setIsImageFormShowing(!isImageFormShowing)}
      ></button>
      {/* <Collapse>
            
        </Collapse> */}
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <button onClick={() => setIsEmailFormShowing(!isEmailFormShowing)}>
        Change email
      </button>
      <Collapse in={isEmailFormShowing}>
        <ChangeEmail changeEmail={changeEmail} />
      </Collapse>
      <p>Date of Birth: {user.dob}</p>
      <p>Client type: {user.role}</p>
      <p>Manager: {user.manager.fullName}</p>
      <button onClick={() => setIsPasswordFormShowing(!isPasswordFormShowing)}>
        Change Password
      </button>
      <Collapse in={isPasswordFormShowing}>
        <ChangePassword />
      </Collapse>
    </div>
  );
}

export default Profile;
