import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { uploadImageService } from "../services/upload.services";
// import { editUserDetailsService } from "../services/user.services";

function EditProfileForm(props) {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newImage = {
      image,
    };

    props.changeImage(newImage);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProfileForm;
