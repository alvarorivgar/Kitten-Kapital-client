import { useEffect, useState } from "react";
import SearchUserForm from "../../components/SearchUserForm";
import { getAllUsersService } from "../../services/admin.services";

function Search() {
  const [userList, setUserList] = useState([]);
  const [userListToDisplay, setUserListToDisplay] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllUsersService();

      setUserList(response.data);
      setUserListToDisplay(response.data);
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

  return (
    <div>
      <h1>Client Search</h1>

      <SearchUserForm filterUsers={filterUsers} />
      <hr />
      {userListToDisplay.map((user) => {
        return (
          <div key={user._id}>
            <p>{user.idNumber}</p>
            <span>{user.firstName} </span>
            <span>{user.lastName}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Search;
