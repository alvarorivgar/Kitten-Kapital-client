import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUserDetailsService } from "../services/user.services";

function ChangeEmail(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const newEmail = {
      email,
    };

    props.changeEmail(newEmail)
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <button >Update</button>
      </form>
    </div>
  );
}

export default ChangeEmail;
