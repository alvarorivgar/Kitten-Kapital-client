import service from "./config.services";

const createAdminService = (admin) => {
    return service.post("/admin/create-admin", admin)
}

const createUserService = (user) => {
    return service.post("/admin/create-user", user)
}

const deleteUserService = (user) => {
    return service.delete("/admin/:userId/delete", user)
}

export {
    createAdminService,
    createUserService,
    deleteUserService
}