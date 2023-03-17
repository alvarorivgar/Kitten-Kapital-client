import service from "./config.services";

const createAdminService = (admin) => {
  return service.post("/admin/create-admin", admin);
};

const createUserService = (user) => {
  return service.post("/admin/create-user", user);
};

const getAllUsersService = () => {
  return service.get("/admin/users");
};

const getAllMyClientsService = () => {
  return service.get("/admin/my-clients");
};

const deleteUserService = (userId) => {
  return service.delete(`/admin/${userId}/delete`);
};

export {
  createAdminService,
  createUserService,
  getAllUsersService,
  getAllMyClientsService,
  deleteUserService,
};
