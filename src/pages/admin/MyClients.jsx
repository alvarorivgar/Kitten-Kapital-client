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
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
          <h1>MyClients</h1>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center">
        <table>
          {myClientsList.map((eachClient) => {
            return (
              <Link
                className="link-button"
                key={eachClient._id}
                to={`/admin/user-details/${eachClient._id}`}
              >
                <div class="d-flex justify-content-left btn btn-block ingresar align-items-center">
                  <span>{eachClient.idNumber}</span>
                  <span className="ms-4">
                    {eachClient.firstName} {eachClient.lastName}
                  </span>
                </div>
                <hr />
              </Link>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default MyClients;
