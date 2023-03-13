import { AuthContext } from "../context/auth.context";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getCheckingAccountsService } from "../services/checking.services";
import { getKittyAccountsService } from "../services/kitty.services";
import { createTransactionService, transferService } from "../services/transfer.services";

function CreateTransferForm() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, loggedUser, isUser, isKitty, isUserOrKitty } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [originAccount, setOriginAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [subject, setSubject] = useState("");
  const [checkingAccountsList, setCheckingAccountsList] = useState([]);
  const [kittyAccountsList, setKittyAccountsList] = useState([]);

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
      
      console.log(newTransfer);
      await transferService(newTransfer)
      await createTransactionService(newTransfer)
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

  return (
    <div>
      {isLoggedIn === false || isUserOrKitty !== true ? (
        <Navigate to="/login" />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* if is User, show your user accounts */}
          {isUser === true ? (
            <div>
              <h3>hola soy un user</h3>
              <label htmlFor="originAccount">
                Origin Account:
                <select name="originAccount" defaultValue="Select your origin Account" onChange={handleOriginAccountChange}>
                <option value="Select your origin Account">Select your origin Account</option>
                  {checkingAccountsList.map((eachAccount) => {
                    return (
                      <option
                        key={eachAccount._id}
                        value={eachAccount._id} 
                      >
                        {eachAccount.accountName}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          ) : (
            <div>
              {/* else, if is kitty, show your kitty accounts */}
              <h3>hola soy un kitty</h3>
              <label htmlFor="originAccount">
                Origin Account:
                <select name="originAccount">
                  {kittyAccountsList.map((eachAccount) => {
                    return (
                      <option
                        value={originAccount}
                        onChangeCapture={handleOriginAccountChange}
                      >
                        {eachAccount.accountName}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          )}          
              <label htmlFor="destinationAccount">Destination Account: </label>
              <input
                type="text"
                name="destinationAccount"
                value={destinationAccount}
                onChange={handleDestinationAccountChange}
              />
              <br />
              <label htmlFor="amount">Amount: </label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={handleAmountChange}
              />
              <br />
              <label htmlFor="subject">Subject: </label>
              <input
                type="text"
                name="subject"
                value={subject}
                onChange={handleSubjectChange}
              />
              <br />
              {errorMessage !== "" ? <p>{errorMessage}</p> : null}
              <br />
              <button type="submit">Agregar</button>
        </form>
      )}
    </div>
  );
}

export default CreateTransferForm;
