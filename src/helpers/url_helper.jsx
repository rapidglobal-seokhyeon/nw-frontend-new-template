// Auth
export const POST_LOGIN = "/api/auth/login";
export const POST_REGISTER = "/api/auth/register";
// export const POST_FAKE_PASSWORD_FORGET = "/auth/forgot-password";
// export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";

//PROFILE
// export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
// export const POST_EDIT_PROFILE = "/user";

//Qsheet
export const GET_QSHEET_LIST = "/api/v1/qsheet";
export const addQsheetList = (qsheet) => api.create(url.ADD_NEW_QSHEET, qsheet);
export const updateQsheetList = (qsheet) => api.put(url.UPDATE_QSHEET, qsheet);
export const deleteQsheetList = (qsheet) => api.delete(url.DELETE_QSHEET, { headers: { qsheet } });

