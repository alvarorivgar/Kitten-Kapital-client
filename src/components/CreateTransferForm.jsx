import { AuthContext } from "../context/auth.context";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getCheckingAccountsService } from "../services/checking.services";
import { getKittyAccountsService } from "../services/kitty.services";
import {
  createTransactionService,
  transferService,
} from "../services/transfer.services";
import { BallTriangle } from "react-loading-icons";

function CreateTransferForm() {
  const navigate = useNavigate();
  const { isLoggedIn, loggedUser, isUser, isUserOrKitty } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [originAccount, setOriginAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [subject, setSubject] = useState("");
  const [checkingAccountsList, setCheckingAccountsList] = useState([]);
  const [kittyAccountsList, setKittyAccountsList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const handleOriginAccountChange = (e) => setOriginAccount(e.target.value);
  const handleDestinationAccountChange = (e) =>
    setDestinationAccount(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      if (loggedUser.role === "user") {
        const response = await getCheckingAccountsService(loggedUser._id);
        setCheckingAccountsList(response.data);
      } else {
        const response = await getKittyAccountsService(loggedUser._id);
        setKittyAccountsList(response.data);
      }
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(checkingAccountsList);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransfer = {
      origin: originAccount,
      destination: destinationAccount,
      amount: amount * 100,
      subject,
    };

    try {
      await transferService(newTransfer);
      await createTransactionService(newTransfer);
      navigate("/user");
    } catch (error) {
      console.log(error);
      // vamos a determinar el tipo de error que recibimos, y actuar diferente
      console.log(error.response.status); // codigo de error enviado
      console.log(error.response.data.errorMessage); // el mensaje de error que dio el fallo
      if (error.response.status === 400) {
        // mostramos al usuario como solventar el problema
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isFetching) {
    return <BallTriangle />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
          {isLoggedIn === false || isUserOrKitty !== true ? (
            <Navigate to="/login" />
          ) : (
            <form onSubmit={handleSubmit}>
              {/* if is User, show your user accounts */}
              {isUser === true ? (
                <div>
                  <div className="form-group text-center pt-3">
                    <h1>Transfer Money</h1>
                  </div>
                  <div className="form-group mx-sm-4 pt-3">
                    <select
                      className="form-control"
                      name="originAccount"
                      defaultValue="Select your origin Account"
                      onChange={handleOriginAccountChange}
                    >
                      <option value="Select your origin Account">
                        Select origin Account
                      </option>
                      {checkingAccountsList.map((eachAccount) => {
                        return (
                          <option key={eachAccount._id} value={eachAccount._id}>
                            {eachAccount.accountName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  {/* else, if is kitty, show your kitty accounts */}
                  <div className="form-group text-center pt-3">
                    <h1>Transfer Money</h1>
                  </div>
                  <div className="form-group mx-sm-4 pt-3">
                    <select
                      className="form-control"
                      name="originAccount"
                      defaultValue="Select your origin Account"
                      onChange={handleOriginAccountChange}
                    >
                      <option value="Select your origin Account">
                        Select your origin Account
                      </option>
                      {kittyAccountsList.map((eachAccount) => {
                        return (
                          <option key={eachAccount._id} value={eachAccount._id}>
                            {eachAccount.accountName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              )}

              <div className="form-group mx-sm-4 pt-3">
                <input
                  className="form-control"
                  type="text"
                  name="destinationAccount"
                  value={destinationAccount}
                  placeholder="Destination Account"
                  onChange={handleDestinationAccountChange}
                />
              </div>
              <div className="form-group mx-sm-4 pt-3">
                <input
                  className="form-control"
                  type="number"
                  name="amount"
                  value={amount}
                  placeholder="0 €"
                  onChange={handleAmountChange}
                />
              </div>
              <div className="form-group mx-sm-4 pt-3">
                <input
                  className="form-control"
                  type="text"
                  name="subject"
                  value={subject}
                  placeholder="Subject"
                  onChange={handleSubjectChange}
                />
              </div>
              <div className="form-group mx-sm-4 pb-4 pt-4">
                <button type="submit" className="btn btn-block ingresar">Transfer</button>
              </div>
              {errorMessage !== "" ? (
                <p class="date-of-birth-text">{errorMessage}</p>
              ) : null}
              <br />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateTransferForm;
