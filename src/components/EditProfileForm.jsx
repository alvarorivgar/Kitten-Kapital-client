import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { uploadImageService } from "../services/upload.services";
import { editUserDetailsService } from "../services/user.services";

function EditProfileForm() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [email, setEmail] = useState(loggedUser.email);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassword1Change = (e) => setPassword1(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);
  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);
      setImage(response.data.image);
      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loggedUser);
    const editedUser = {
      email,
      password1,
      password2,
      image,
    };

    try {
      await editUserDetailsService(loggedUser._id, editedUser);
      navigate("/user/profile");
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
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password1">New Password</label>
        <input
          type="password"
          name="password1"
          value={password1}
          onChange={handlePassword1Change}
        />
        <br />
        <label htmlFor="password2">New Confirm Password</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={handlePassword2Change}
        />
        <br />
        <label htmlFor="image">Profile picture</label>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <br />
        {isUploading ? <h3>... uploading image</h3> : null}
        {image ? (
          <div>
            <img src={image} alt="img" width={200} />
          </div>
        ) : null}
        <br />
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProfileForm;
