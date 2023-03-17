import { useEffect, useState } from "react";
import SearchUserForm from "../../components/SearchUserForm";
import { getAllUsersService } from "../../services/admin.services";
import { BallTriangle } from "react-loading-icons";
import { Link } from "react-router-dom";

function Search() {
  const [userList, setUserList] = useState([]);
  const [userListToDisplay, setUserListToDisplay] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllUsersService();

      setUserList(response.data);
      setUserListToDisplay(response.data);
      setIsFetching(false);
    } catch (error) {}
  };

  const filterUsers = (searchInput) => {
    const filteredUsers = userList.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return (
        user.idNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
        fullName.toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    setUserListToDisplay(filteredUsers);
  };

  if (isFetching) {
    return <BallTriangle />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
          <h1>Client Search</h1>

          <SearchUserForm filterUsers={filterUsers} />
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center">
        <table>
          {userListToDisplay.map((user) => {
            return (
              <div>
                <Link
                  className="link-button"
                  key={user._id}
                  to={`/admin/user-details/${user._id}`}
                >
                  <div class="d-flex justify-content-left btn btn-block ingresar align-items-center">
                    <span>{user.idNumber}</span>
                    <span className="ms-4">{user.firstName} </span>
                    <span className="ms-1">{user.lastName}</span>
                  </div>
                  <hr />
                </Link>
              </div>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Search;
