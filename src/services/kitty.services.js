import service from "./config.services";

const createKittyAccountService = (userId, kittyAccount) => {
    return service.post(`/kitty/${userId}/create`, kittyAccount)
}

const getKittyAccountsService = (userId) => {
    return service.get(`/kitty/${userId}/all`)
}

const getSingleKittyAccountDetailsService = (accountId) => {
    return service.get(`/kitty/${accountId}/details`)
}

const deleteKittyAccountService = (accountId) => {
    return service.delete(`/kitty/${accountId}/delete`)
}

export {
    createKittyAccountService,
    getKittyAccountsService,
    getSingleKittyAccountDetailsService,
    deleteKittyAccountService

}