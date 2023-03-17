import service from "./config.services";

const getUserService = (userId) => {
  return service.get(`/user/${userId}`);
};

const editUserEmailService = (userId, newEmail) => {
  return service.patch(`/user/${userId}/edit-email`, newEmail);
};
const editUserPasswordService = (userId, newPassword1, newPassword2) => {
  return service.patch(
    `/user/${userId}/edit-password`,
    newPassword1,
    newPassword2
  );
};
const editUserImageService = (userId, newImage) => {
  return service.patch(`/user/${userId}/edit-image`, newImage);
};

export {
  getUserService,
  editUserEmailService,
  editUserPasswordService,
  editUserImageService,
};
