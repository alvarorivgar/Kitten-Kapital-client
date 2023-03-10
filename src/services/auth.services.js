import service from "./config.services";

const loginService = (user) => {
    return service.post("/auth/login", user)
}

const verifyService = () => {
    return service.get("/auth/verify")
}

export {
    loginService,
    verifyService
}