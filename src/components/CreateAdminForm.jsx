import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdminService } from "../services/admin.services";

function CreateAdminForm() {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleIdNumberChange = (e) => setIdNumber(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFullNameChange = (e) => setFullName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAdmin = {
      idNumber,
      password,
      fullName,
    };

    try {
      await createAdminService(newAdmin);
      navigate("/login");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
          <form onSubmit={handleSubmit}>
            <div className="form-group mx-sm-4 pt-3">
              <input
                className="form-control"
                type="text"
                name="idNumber"
                value={idNumber}
                placeholder="introduce Id"
                onChange={handleIdNumberChange}
              />
            </div>
            <div className="form-group mx-sm-4 pt-3">
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group mx-sm-4 pt-3">
              <input
                className="form-control"
                type="text"
                name="fullName"
                value={fullName}
                placeholder="fullName"
                onChange={handleFullNameChange}
              />
            </div>
            <div className="form-group mx-sm-4 pb-4 pt-4">
              <button type="submit" className="btn btn-block ingresar">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAdminForm;
