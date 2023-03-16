import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUserDetailsService } from "../services/user.services";

function ChangeEmail(props) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newEmail = {
      email,
    };

    props.changeEmail(newEmail);
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
          <form onSubmit={handleSubmitForm}>
            <div className="form-group mx-sm-4 pt-3">
              <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={handleEmailChange}
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

export default ChangeEmail;
