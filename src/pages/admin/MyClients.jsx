import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { getAllMyClientsService } from "../../services/admin.services";

function MyClients() {
  const [isFetching, setIsFetching] = useState(true);
  const [myClientsList, setMyClientsList] = useState([]);
  const { loggedUser, isAdmin, authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const clients = await getAllMyClientsService();
      setMyClientsList(clients.data);
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
      <div>MyClients</div>
      {myClientsList.map((eachClient) => {
        return (
          <Link key={eachClient._id} to={`/admin/user-details/${eachClient._id}`}>
            <div>
              <p>
                {eachClient.firstName} {eachClient.lastName}
              </p>
              <p>{eachClient.idNumber}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default MyClients;
