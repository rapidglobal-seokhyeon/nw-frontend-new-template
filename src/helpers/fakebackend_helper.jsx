import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Qsheet
export const getQsheetList = () => api.get(url.GET_QSHEET_LIST);
export const addQsheetList = (qsheet) => api.create(url.ADD_NEW_QSHEET, qsheet);
export const updateQsheetList = (qsheet) => api.put(url.UPDATE_QSHEET, qsheet);
export const deleteQsheetList = (qsheet) => api.delete(url.DELETE_QSHEET, { headers: { qsheet } });

