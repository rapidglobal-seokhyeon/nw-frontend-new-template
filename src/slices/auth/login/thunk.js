//Include Both Helper File with needed methods
import { postLogin } from "../../../helpers/Auth/auth_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from "./reducer";

export const loginUser = (user, history) => async dispatch => {
  try {
    console.log("[src/slices//auth/login/thunk.js] response : ", user);
    let response;

    response = postLogin({
      userId: user.name,
      userPassword: user.password,
    });

    var data = await response;
    if (data) {
      sessionStorage.setItem("authUser", JSON.stringify(data));
      dispatch(loginSuccess(data));
      history("/dashboard");
    }
  } catch (error) {
    console.log("[src/slices//auth/login/thunk.js] error : ", error);
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async dispatch => {
  try {
    sessionStorage.removeItem("authUser");
    dispatch(logoutUserSuccess(true));
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async dispatch => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
