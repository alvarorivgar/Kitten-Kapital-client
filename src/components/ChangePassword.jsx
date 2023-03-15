import { useState } from "react";

function ChangePassword(props) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handlePassword1Change = (e) => setPassword1(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newPassword = {
      password1,
      password2,
    };

    props.changePassword(newPassword);
  };

  return (
    <div>
      <p>Warning! After changing your password you will need to log in.</p>

      <form onSubmit={handleSubmitForm}>
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
        <button>Update</button>
      </form>
    </div>
  );
}

export default ChangePassword;
