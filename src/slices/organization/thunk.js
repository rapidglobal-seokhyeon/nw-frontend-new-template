import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrgList as getOrgListApi,
  updateOrgEnabled as updateOrgEnabledApi,
} from "../../helpers/organization_helper";

export const getOrg = createAsyncThunk("Org/getOrg", async () => {
  try {
    const response = getOrgListApi();
    console.log("response : ", response);
    return response;
  } catch (error) {
    return error;
  }
});

export const updateOrgEnabled = createAsyncThunk(
  "Org/updateOrgEnabled",
  async (orgSeq, orgEnabled) => {
    try {
      const response = updateOrgEnabledApi(orgSeq, orgEnabled);
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }
);
