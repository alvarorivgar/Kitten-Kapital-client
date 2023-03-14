import service from "./config.services";

const getUserService = (userId) => {
    return service.get(`/user/${userId}`)
}

const editUserDetailsService = (userId) => {
    return service.patch(`/user/${userId}`)
}


export {
    getUserService,
    editUserDetailsService
}