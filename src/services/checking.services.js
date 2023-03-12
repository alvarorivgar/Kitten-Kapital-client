import service from "./config.services";

const createCheckingAccountService = (userId, checkingAccount) => {
    return service.post(`/checking/${userId}/create`, checkingAccount)
}

const getCheckingAccountsService = () => {
    return service.get("/checking/all")
}


export {
    createCheckingAccountService,
    getCheckingAccountsService
}