import service from "./config.services";

const createKittyAccountService = (userId, kittyAccount) => {
    return service.post(`/kitty/${userId}/create`, kittyAccount)
}



export {
    createKittyAccountService,


}