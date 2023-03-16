import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteUserService } from "../../services/admin.services";
import { getCheckingAccountsService } from "../../services/checking.services";
import { getKittyAccountsService } from "../../services/kitty.services";
import { getUserService } from "../../services/user.services";
import { BallTriangle } from "react-loading-icons";


function UserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const foundUser = await getUserService(userId);
      let foundAccounts;
      foundUser.data.role === "user"
        ? (foundAccounts = await getCheckingAccountsService(userId))
        : (foundAccounts = await getKittyAccountsService(userId));
      setUser(foundUser.data);
      setAccounts(foundAccounts.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserService(user._id);
      navigate("/admin/my-clients");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isFetching) {
    return <BallTriangle />
  }

  return (
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">

      
     
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
          return (
            <>
              <Link key={account._id} to={`/user/${account._id}/details`} className="link-white">
                <p>{account._id}</p>
              </Link>
            </>
          );
        })}
      </ul>
      <br />
      {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      <br />
      <button onClick={handleDeleteUser} className="btn btn-block ingresar">Delete User</button>
      <span>   </span>
      <Link to={`/create-account/${user._id}`}>
        <button className="btn btn-block ingresar">Add Account</button>
      </Link>
      </div>
         
      </div>
    </div>
  );
}

export default UserDetails;
