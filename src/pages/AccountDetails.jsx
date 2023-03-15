import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  deleteCheckingAccountService,
  getSingleCheckingAccountDetailsService,
} from "../services/checking.services";
import {
  deleteKittyAccountService,
  getSingleKittyAccountDetailsService,
} from "../services/kitty.services";
import { getAccountTransactionsService } from "../services/transfer.services";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

function AccountDetails() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [transactionList, setTransactionList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { loggedUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let foundAccount = await getSingleCheckingAccountDetailsService(
        accountId
      );
      if (!foundAccount.data) {
        foundAccount = await getSingleKittyAccountDetailsService(accountId);
      }

      setAccount(foundAccount.data);
      const transactions = await getAccountTransactionsService(accountId);
      setTransactionList(transactions.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      account.owner.role === "user"
        ? await deleteCheckingAccountService(accountId)
        : await deleteKittyAccountService(accountId);

      loggedUser.role === "admin"
        ? navigate(`/admin/user-details/${account.owner._id}`)
        : navigate("/user");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isFetching) {
    return <h2>Spinner...</h2>;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div>
        <p>{account.accountName}</p>
        <p>
          <span>{account._id}</span> <span>{account.balance}€</span>
        </p>
      </div>
      <div>
        <>
          <Button variant="primary" onClick={handleShow}>
            Add Money
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              <div className="wrapper">
                <div className="card px-4">
                  <div className=" my-3">
                    <p className="h8">Card number</p>
                    <p className="text-muted ">
                      Introduce your Credit Card credentials and the money to
                      your virtual account
                    </p>
                  </div>

                  <div className="debit-card mb-3">
                    <div className="d-flex flex-column h-100">
                      <label className="d-block">
                        <div className="d-flex position-relative">
                          <div>
                            <img
                              src="https://www.freepnglogos.com/uploads/visa-inc-logo-png-11.png"
                              className="visa"
                              alt=""
                            ></img>
                            <p className="mt-2 mb-4 text-white fw-bold"></p>
                          </div>
                          <div className="input">
                            <input type="radio" name="card" id="check"></input>
                          </div>
                        </div>
                      </label>
                      <div className="mt-auto fw-bold d-flex align-items-center justify-content-between">
                        <p>
                          <input
                            // minLength="16"
                            // maxLength="16"
                            className="card-Number-Form"
                            size="16"
                            type="text"
                            placeholder="1234567890123456"
                          />
                        </p>

                        <p>
                          <input
                            // minLength="5"
                            // maxLength="5"
                            className="card-Date-Form"
                            size="5"
                            type="text"
                            placeholder="05/23"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="debit-card card-2 mb-4">
                    <div className="d-flex flex-column h-100">
                      <label className="d-block">
                        <div className="d-flex position-relative">
                          <div>
                            <img
                              src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-png-transparent-svg-vector-bie-supply-0.png"
                              alt="master"
                              className="master"
                            ></img>
                          </div>
                          <div className="input">
                            <input type="radio" name="card" id="check"></input>
                          </div>
                        </div>
                      </label>
                      <div className="mt-auto fw-bold d-flex align-items-center justify-content-between">
                        <p>
                          <input
                            // minlength="16"
                            // maxlength="16"
                            className="card-Number-Form"
                            size="16"
                            type="text"
                            placeholder="1234567890123456"
                          />
                        </p>

                        <p>
                          <input
                            // minLength="5"
                            // maxLength="5"
                            className="card-Date-Form"
                            size="5"
                            type="text"
                            placeholder="05/23"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <Form.Control
                    className="card-addMoney-form mb-4"
                    size="lg"
                    type="text"
                    placeholder="0  €"
                  />
                  <div className="btnCard mb-4">Add Money</div>
                  <div className="btnCard mb-4" onClick={handleClose}>
                    Close
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      </div>
      <div>
        <h3>Movements</h3>
        {transactionList.map((transaction) => {
          return (
            <div key={transaction._id}>
              <p>Origin: {transaction.origin}</p>
              <p>Amount: {transaction.amount / 100}€</p>
              <p>Subject: {transaction.subject}</p>
              <p>Destination: {transaction.destination}</p>
              <p>Date: {transaction.createdAt}</p>
            </div>
          );
        })}
      </div>
      <br />
      {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      <br />
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default AccountDetails;
