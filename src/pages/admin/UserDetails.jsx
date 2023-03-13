import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCheckingAccountsService } from "../../services/checking.services";
import { getKittyAccountsService } from "../../services/kitty.services";
import { getUserService } from "../../services/user.services";

function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const foundUser = await getUserService(userId);
      const foundAccounts = await getCheckingAccountsService(userId) || await getKittyAccountsService(userId);
      setUser(foundUser.data);
      setAccounts(foundAccounts.data);
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
      <h2>
        {user.firstName} {user.lastName}
      </h2>

      <p>ID: {user.idNumber}</p>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {user.dob}</p>
      <p>Client type: {user.role}</p>
      <p>Manager: {user.manager.fullName}</p>
      <ul>
        <p>Accounts:</p>
        {accounts.map((account) => {
          <Link key={account._id} to={`/user/${account._id}/details`}>
            return <li>{account._id}</li>;
          </Link>;
        })}
      </ul>
      <Link>
        <button>Delete User</button>
      </Link>
      <Link to={`/create-account/${user._id}"`}>
        <button>Add Account</button>
      </Link>
    </div>
  );
}

export default UserDetails;
