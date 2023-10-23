import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
// export const postLogin = data => api.create(url.POST_LOGIN, data);
export const postLogin = data => {
  return api.create(url.POST_LOGIN, data).catch(err => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "죄송합니다. 가입 정보를 찾을 수 없습니다.";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Register Method
export const postRegister = data => {
  return api.create(url.POST_REGISTER, data).catch(err => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "중복된 가입 정보가 있습니다.";
          break;
        case 500:
          message = "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};
