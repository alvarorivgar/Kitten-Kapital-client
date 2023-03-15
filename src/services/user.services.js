import service from "./config.services";

const getUserService = (userId) => {
    return service.get(`/user/${userId}`)
}

const editUserDetailsService = (userId, editedUser) => {
    return service.patch(`/user/${userId}/edit`, editedUser)
}


export {
    getUserService,
    editUserDetailsService
}