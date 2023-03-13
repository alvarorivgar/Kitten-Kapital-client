import service from "./config.services";

const createKittyAccountService = (userId, kittyAccount) => {
    return service.post(`/kitty/${userId}/create`, kittyAccount)
}

const getKittyAccountsService = (userId) => {
    return service.get(`/kitty/${userId}/all`)
}



export {
    createKittyAccountService,
    getKittyAccountsService,

}