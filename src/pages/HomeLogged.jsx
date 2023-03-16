import { useContext, useEffect, useState } from "react";
import { getCheckingAccountsService } from "../services/checking.services";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getKittyAccountsService } from "../services/kitty.services";
import { getUserService } from "../services/user.services";
import { BallTriangle } from "react-loading-icons";
import { Collapse } from "react-bootstrap";

function Home() {
  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [accountList, setAccountList] = useState([]);
  const [isAccountListShowing, setIsAccountListShowing] = useState(false);
  const [isSavingsAccountListShowing, setIsSavingsAccountListShowing] =
    useState(false);
  const [isCreditCardListShowing, setIsCreditCardListShowing] = useState(false);
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      if (loggedUser.role === "admin") {
        navigate("/admin/my-clients");
      }

      const foundUser = await getUserService(loggedUser._id);
      setUser(foundUser.data);
      let foundAccounts;
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
    return <BallTriangle />;
  }

  return (
    <div>
      <header id="home-header">
        <img src={user.image} alt="profile pic" className="img-circle" />
        <span>Hello, {user.firstName}</span>
      </header>
      <div
        className="acc-collapse"
        onClick={() => setIsAccountListShowing(!isAccountListShowing)}
      >
        Accounts
      </div>
      <Collapse in={isAccountListShowing}>
        <div className="home-acc-list">
          {accountList.map((account) => {
            return (
              <Link
                className="link"
                to={`/user/${account._id}/details`}
                key={account._id}
              >
                <div>
                  <p>{account.accountName}</p>
                  <p>IBAN: {account._id}</p>
                </div>
                <div>
                  <p>{account.balance / 100}€</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Collapse>
      <div
        className="acc-collapse"
        onClick={() =>
          setIsSavingsAccountListShowing(!isSavingsAccountListShowing)
        }
      >
        Savings
      </div>
      <Collapse in={isSavingsAccountListShowing}>
        <div>No accounts found</div>
      </Collapse>

      <div
        className="acc-collapse"
        onClick={() => setIsCreditCardListShowing(!isCreditCardListShowing)}
      >
        Credit Cards
      </div>
      <Collapse in={isCreditCardListShowing}>
        <div>No cards found</div>
      </Collapse>

      <div>
        <Link to={`/create-account/${loggedUser._id}`}>
          <button id="new-acc-btn">+</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
