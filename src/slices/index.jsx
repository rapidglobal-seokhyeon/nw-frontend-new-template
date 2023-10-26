import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import QsheetReducer from "./qsheet/reducer";
import OrganizationReducer from "./organization/reducer";
import EmployeeReducer from "./employee/reducer";
import CustomerReducer from "./Customer/reducer";

// const rootReducer = combineReducers({
// Layout: LayoutReducer,
// Login: LoginReducer,
// Account: AccountReducer,
// ForgetPassword: ForgetPasswordReducer,
// Profile: ProfileReducer,
// Qsheet: QsheetReducer

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Org: OrganizationReducer,
  Employee: EmployeeReducer,
  Customer: CustomerReducer,
  Qsheet: QsheetReducer,
});

export default rootReducer;
