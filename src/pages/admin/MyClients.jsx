import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMyClientsService } from "../../services/admin.services";
import { BallTriangle } from "react-loading-icons";

function MyClients() {
  const [isFetching, setIsFetching] = useState(true);
  const [myClientsList, setMyClientsList] = useState([]);

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
    return <BallTriangle />;
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
