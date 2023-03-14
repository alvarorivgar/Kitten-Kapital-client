import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleCheckingAccountDetailsService } from "../services/checking.services";
import { getSingleKittyAccountDetailsService } from "../services/kitty.services";
import { getAccountTransactionsService } from "../services/transfer.services";
import { getUserService } from "../services/user.services";

function AccountDetails() {
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [transactionList, setTransactionList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

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
      console.log(error);
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
          <span>{account._id}</span> <span>{account.balance}</span>
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
    </div>
  );
}

export default AccountDetails;
