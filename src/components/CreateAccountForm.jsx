import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { createCheckingAccountService } from "../services/checking.services";
import { getUserService } from "../services/user.services";
import { createKittyAccountService } from "../services/kitty.services";

function CreateAccountForm() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, loggedUser } = useContext(AuthContext);
  const { userId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [accountName, setAccountName] = useState("");
  const [transferFee, setTransferFee] = useState("5");
  const [maintenanceFee, setMaintenanceFee] = useState("2");
  const [penaltyFee, setPenaltyFee] = useState(1);
  const [minimumBalance, setMinimumBalance] = useState(5);

  const handleAccountNameChange = (e) => setAccountName(e.target.value);
  const handleTransferFeeChange = (e) => setTransferFee(e.target.value);
  const handleMaintenanceFeeChange = (e) => setMaintenanceFee(e.target.value);
  const handlePenaltyFeeChange = (e) => setPenaltyFee(e.target.value);
  const handleMinimumBalanceChange = (e) => setMinimumBalance(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAccount = {
      accountName,
      transferFee: transferFee * 100,
      maintenanceFee: maintenanceFee * 100,
      penaltyFee: penaltyFee * 100,
      minimumBalance: minimumBalance * 100,
    };

    try {
      const foundUser = await getUserService(userId);

      if (foundUser.data.role === "user") {
        await createCheckingAccountService(userId, newAccount);
      } else {
        await createKittyAccountService(userId, newAccount);
      }

      loggedUser.role === "admin"
        ? navigate("/admin/my-clients")
        : navigate("/user");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
          {isLoggedIn === false ? (
            <Navigate to="/login" />
          ) : isAdmin === true ? (
            <div>
              <div className="form-group text-center pt-3">
                <h1>Create an account</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mx-sm-4 pt-3">
                  <input
                    className="form-control"
                    type="text"
                    name="accountName"
                    value={accountName}
                    placeholder="Account Name"
                    onChange={handleAccountNameChange}
                  />
                </div>
                <div className="form-group mx-sm-4 pt-3">
                  <label htmlFor="transferFee">Transfer Fee</label>
                  <input
                    className="form-control"
                    type="number"
                    name="transferFee"
                    value={transferFee}
                    placeholder="5€ by default"
                    onChange={handleTransferFeeChange}
                  />
                </div>
                <div className="form-group mx-sm-4 pt-3">
                  <label htmlFor="maintenanceFee">Maintenance Fee</label>
                  <input
                    className="form-control"
                    type="number"
                    name="maintenanceFee"
                    value={maintenanceFee}
                    placeholder="2€ by default"
                    onChange={handleMaintenanceFeeChange}
                  />
                </div>
                <div className="form-group mx-sm-4 pt-3">
                  <label htmlFor="penaltyFee">Penalty Fee</label>
                  <input
                    className="form-control"
                    type="number"
                    name="penaltyFee"
                    value={penaltyFee}
                    placeholder="1€ by default"
                    onChange={handlePenaltyFeeChange}
                  />
                </div>
                <div className="form-group mx-sm-4 pt-3">
                  <label htmlFor="minimumBalance">Minimum Balance</label>
                  <input
                    className="form-control"
                    type="number"
                    name="minimumBalance"
                    value={minimumBalance}
                    placeholder="5€ by default"
                    onChange={handleMinimumBalanceChange}
                  />
                </div>
                <div className="form-group mx-sm-4 pb-4 pt-4">
                  <button type="submit" className="btn btn-block ingresar">
                    Agregar
                  </button>
                </div>
                {errorMessage !== "" ? (
                  <p class="date-of-birth-text">{errorMessage}</p>
                ) : null}
              </form>
            </div>
          ) : (
            <div>
              <div className="form-group text-center pt-3">
                <h1>Create an account</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mx-sm-4 pt-3">
                  <input
                    className="form-control"
                    type="text"
                    name="accountName"
                    value={accountName}
                    placeholder="Account Name"
                    onChange={handleAccountNameChange}
                  />
                </div>
                <div className="form-group mx-sm-4 pb-4 pt-4">
                  <button type="submit" className="btn btn-block ingresar">
                    Agregar
                  </button>
                </div>
                {errorMessage !== "" ? (
                  <p class="date-of-birth-text">{errorMessage}</p>
                ) : null}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateAccountForm;
