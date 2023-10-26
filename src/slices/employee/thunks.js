import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployee as getEmployeeListApi } from "../../helpers/employee_helper";

export const getEmployee = createAsyncThunk("Employee/getEmployee", async () => {
  try {
    const response = getEmployeeListApi();
    console.log("response: ", response)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
})