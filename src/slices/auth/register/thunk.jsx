import { postRegister } from "../../../helpers/Auth/auth_helper";

// action
import { registerUserSuccessful, registerUserFailed, resetRegisterFlagChange, apiErrorChange } from "./reducer";

// Is user register successfull then direct plot user in redux.
export const registerUser = user => async dispatch => {
  try {
    console.log("[src/slices//auth/login/thunk.js] response : ", user);
    let response;

    response = postRegister({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userPassword: user.password,
    });

    var data = await response;
    dispatch(registerUserSuccessful(data));
  } catch (error) {
    console.log("[src/slices//auth/login/thunk.js] error : ", error);
    dispatch(registerUserFailed(error));
  }
  // try {
  //   let response = postRegister(user);
  //   const data = await response;

  //   if (data.message === "success") {
  //     dispatch(registerUserSuccessful(data));
  //   } else {
  //     dispatch(registerUserFailed(data));
  //   }
  // } catch (error) {
  //   dispatch(registerUserFailed(error));
  // }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiError = () => {
  try {
    const response = apiErrorChange();
    return response;
  } catch (error) {
    return error;
  }
};
