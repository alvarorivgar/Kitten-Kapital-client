import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCheckingAccountsService } from "../services/checking.services";
import { getUserService } from "../services/user.services";
import { AuthContext } from "../context/auth.context";

function Home() {
  const [isFetching, setIsFetching] = useState(true);
  const [accountList, setAccountList] = useState([]);
  const { loggedUser } = useContext(AuthContext);


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const accounts = await getCheckingAccountsService(loggedUser._id);
      setAccountList(accounts.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) {
    return <h2>Searching...</h2>;
  }

  return (
    <div>
      <header>
        <img src={loggedUser.image} alt="profile pic" />
        <span>Hello, {loggedUser.firstName}</span>
      </header>

      <div>
        {accountList.map((account) => {
          return (
            <div key={account._id}>
              <p>{account.accountName}</p>
              <p>{account.balance / 100}€</p>
              <p>{account._id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
