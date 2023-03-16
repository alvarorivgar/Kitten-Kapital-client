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
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
          <p class="date-of-birth-text">
            Warning! After changing your password you will need to log in.
          </p>

          <form onSubmit={handleSubmitForm}>
            <div className="form-group mx-sm-4 pt-3">
              <input
                className="form-control"
                type="password"
                name="password1"
                value={password1}
                placeholder="Introduce a new password"
                onChange={handlePassword1Change}
              />
            </div>
            <div className="form-group mx-sm-4 pt-3">
              <input
                className="form-control"
                type="password"
                name="password2"
                value={password2}
                placeholder="Confirm the new password"
                onChange={handlePassword2Change}
              />
            </div>
            <div className="form-group mx-sm-4 pb-4 pt-4">
              <button className="btn btn-block ingresar">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
