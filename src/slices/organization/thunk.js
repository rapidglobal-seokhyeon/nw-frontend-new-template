import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrganizationListApi } from "../../helpers/Auth/auth_helper";

export const getOrganizationList = createAsyncThunk("/org", async () => {
  try {
    const response = getOrganizationListApi();
    console.log("response : ", response);
    return response;
  } catch (error) {
    return error;
  }
});
