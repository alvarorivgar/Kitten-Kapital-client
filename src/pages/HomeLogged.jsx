import { useContext, useEffect, useState } from "react";
import { getCheckingAccountsService } from "../services/checking.services";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getKittyAccountsService } from "../services/kitty.services";

function Home() {
  const [isFetching, setIsFetching] = useState(true);
  const [accountList, setAccountList] = useState([]);
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      if (loggedUser.role === "admin") {
        navigate("/admin/my-clients")
      }

      let foundAccounts
      loggedUser.role === "user"
        ? (foundAccounts = await getCheckingAccountsService(loggedUser._id))
        : (foundAccounts = await getKittyAccountsService(loggedUser._id));
      setAccountList(foundAccounts.data);
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
            <Link to={`/user/${account._id}/details`} key={account._id}>
              <p>{account.accountName}</p>
              <p>{account.balance / 100}€</p>
              <p>{account._id}</p>
            </Link>
          );
        })}
      </div>

      <div>
        <Link to={`/create-account/${loggedUser._id}`}><button>+</button></Link>
      </div>
    </div>
  );
}

export default Home;
