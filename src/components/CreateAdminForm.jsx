import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdminService } from "../services/admin.services";

function CreateAdminForm() {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleIdNumberChange = (e) => setIdNumber(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAdmin = {
      idNumber,
      password,
    };

    try {
      await createAdminService(newAdmin);
      navigate("/login");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="idNumber">ID:</label>
        <input
          type="text"
          name="idNumber"
          value={idNumber}
          onChange={handleIdNumberChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateAdminForm;
