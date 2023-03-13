import service from "./config.services";

const createCheckingAccountService = (userId, checkingAccount) => {
    return service.post(`/checking/${userId}/create`, checkingAccount)
}

const getCheckingAccountsService = (userId) => {
    return service.get(`/checking/${userId}/all`)
}


export {
    createCheckingAccountService,
    getCheckingAccountsService
}