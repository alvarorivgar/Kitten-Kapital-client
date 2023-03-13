import service from "./config.services";

const createTransactionService = (newTransfer) => {
  return service.post("/transaction/create", newTransfer);
};

const transferService = (newTransfer) => {
  return service.patch("/transaction/transfer", newTransfer);
};

const getAccountTransactionsService = (accountId) => {
  return service.get(`/transaction/${accountId}/all`);
};

export {
  createTransactionService,
  transferService,
  getAccountTransactionsService,
};
