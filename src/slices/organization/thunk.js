import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrgList as getOrgListApi,
  updateOrgEnabled as updateOrgEnabledApi,
  deleteOrganization as deleteOrgApi,
} from "../../helpers/organization_helper";

export const getOrg = createAsyncThunk("Org/getOrg", async () => {
  try {
    const response = getOrgListApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const updateOrgEnabled = createAsyncThunk(
  "Org/updateOrgEnabled",
  async (orgSeq, org) => {
    try {
      const response = updateOrgEnabledApi(orgSeq, org);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const deleteOrg = createAsyncThunk("Org/deleteOrg", async (orgSeq) => {
  try {
    const response = deleteOrgApi(orgSeq);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
});
