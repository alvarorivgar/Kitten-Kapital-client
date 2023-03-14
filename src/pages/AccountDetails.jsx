import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  deleteCheckingAccountService,
  getSingleCheckingAccountDetailsService,
} from "../services/checking.services";
import {
  deleteKittyAccountService,
  getSingleKittyAccountDetailsService,
} from "../services/kitty.services";
import { getAccountTransactionsService } from "../services/transfer.services";

function AccountDetails() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [transactionList, setTransactionList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { loggedUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let foundAccount = await getSingleCheckingAccountDetailsService(
        accountId
      );
      if (!foundAccount.data) {
        foundAccount = await getSingleKittyAccountDetailsService(accountId);
      }

      setAccount(foundAccount.data);
      const transactions = await getAccountTransactionsService(accountId);
      setTransactionList(transactions.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error")
    }
  };

  const handleDeleteAccount = async () => {
    try {
      account.owner.role === "user"
        ? await deleteCheckingAccountService(accountId)
        : await deleteKittyAccountService(accountId);

      loggedUser.role === "admin"
        ? navigate(`/admin/user-details/${account.owner._id}`)
        : navigate("/user");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isFetching) {
    return <h2>Spinner...</h2>;
  }

  return (
    <div>
      <div>
        <p>{account.accountName}</p>
        <p>
          <span>{account._id}</span> <span>{account.balance}€</span>
        </p>
      </div>
      <div>
        <button>Add Money</button>
      </div>
      <div>
        <h3>Movements</h3>
        {transactionList.map((transaction) => {
          return (
            <div key={transaction._id}>
              <p>Origin: {transaction.origin}</p>
              <p>Amount: {transaction.amount / 100}€</p>
              <p>Subject: {transaction.subject}</p>
              <p>Destination: {transaction.destination}</p>
              <p>Date: {transaction.createdAt}</p>
            </div>
          );
        })}
      </div>
      <br />
      {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      <br />
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default AccountDetails;
