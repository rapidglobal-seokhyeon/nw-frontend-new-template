import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getQsheetList as getQsheetListApi,
  addQsheetList as addQsheetListApi,
  updateQsheetList as updateQsheetListApi,
  deleteQsheetList as deleteQsheetListApi,
  getQsheetLogList as getQsheetLogListApi,
} from "../../helpers/Cuesheet/cuesheet_helper";

export const getQsheetList = createAsyncThunk(
  "qsheets/getQsheetList",
  async (params) => {
    try {
      console.info("params params", params);
      const response = getQsheetListApi(params);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addQsheetList = createAsyncThunk(
  "qsheets/addQsheetList",
  async (project) => {
    try {
      const response = addQsheetListApi(project);
      const data = await response;
      toast.success("qsheet-list Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("qsheet-list Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateQsheetList = createAsyncThunk(
  "qsheets/updateQsheetList",
  async (project) => {
    try {
      const response = updateQsheetListApi(project);
      const data = await response;
      toast.success("qsheet-list Updated Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("qsheet-list Updated Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteQsheetList = createAsyncThunk(
  "qsheets/deleteQsheetList",
  async (data) => {
    try {
      const response = deleteQsheetListApi(data);
      const newdata = await response;
      toast.success("qsheet-list Delete Successfully", { autoClose: 3000 });
      return newdata;
    } catch (error) {
      toast.error("qsheet-list Delete Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const getQsheetLogList = createAsyncThunk(
  "qsheets/getQsheetLogList",
  async () => {
    try {
      const response = getQsheetLogListApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);
