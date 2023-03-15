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
  const [transferFee, setTransferFee] = useState(5);
  const [maintenanceFee, setMaintenanceFee] = useState(2);
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

      console.log(foundUser);
       
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
    <div>
      {isLoggedIn === false ? (
        <Navigate to="/login" />
      ) : isAdmin === true ? (
        <div>
          <h3>Create an account</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="accountName">Account Name</label>
            <input
              type="text"
              name="accountName"
              value={accountName}
              onChange={handleAccountNameChange}
            />
            <br />
            <label htmlFor="transferFee">Transfer Fee</label>
            <input
              type="number"
              name="transferFee"
              value={transferFee}
              onChange={handleTransferFeeChange}
            />
            <br />
            <label htmlFor="maintenanceFee">Maintenance Fee</label>
            <input
              type="number"
              name="maintenanceFee"
              value={maintenanceFee}
              onChange={handleMaintenanceFeeChange}
            />
            <br />
            <label htmlFor="penaltyFee">Penalty Fee</label>
            <input
              type="number"
              name="penaltyFee"
              value={penaltyFee}
              onChange={handlePenaltyFeeChange}
            />
            <br />
            <label htmlFor="minimumBalance">Minimum Balance</label>
            <input
              type="number"
              name="minimumBalance"
              value={minimumBalance}
              onChange={handleMinimumBalanceChange}
            />
            <br />
            {errorMessage !== "" ? <p>{errorMessage}</p> : null}
            <br />
            <button type="submit">Agregar</button>
          </form>
        </div>
      ) : (
        <div>
          <h3>Soy un user o un kitten, hola</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="accountName">Account Name</label>
            <input
              type="text"
              name="accountName"
              value={accountName}
              onChange={handleAccountNameChange}
            />
            <br />
            {errorMessage !== "" ? <p>{errorMessage}</p> : null}
            <br />
            <button type="submit">Agregar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateAccountForm;
