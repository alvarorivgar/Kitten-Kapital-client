import service from "./config.services";

const createCheckingAccountService = (userId, checkingAccount) => {
    return service.post(`/checking/${userId}/create`, checkingAccount)
}

const getCheckingAccountsService = (userId) => {
    return service.get(`/checking/${userId}/all`)
}

const getSingleCheckingAccountDetailsService = (accountId) => {
    return service.get(`/checking/${accountId}/details`)
}

const deleteCheckingAccountService = (accountId) => {
    return service.delete(`/checking/${accountId}/delete`)
}

const addMoneyCheckingService = (accountId, moneyToAdd)=>{
    return service.patch(`checking/${accountId}/add-money`, moneyToAdd)
}

export {
    createCheckingAccountService,
    getCheckingAccountsService,
    getSingleCheckingAccountDetailsService,
    deleteCheckingAccountService,
    addMoneyCheckingService
}