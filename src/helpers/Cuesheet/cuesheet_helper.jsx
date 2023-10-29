import { APIClient } from "../api_helper";
import * as url from "../url_helper";

const api = new APIClient();

export const getQsheetList = () => {
  return api.get(url.GET_QSHEET_LIST).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

export const addQsheetList = (qsheet) =>
  api.create(url.GET_QSHEET_LIST, qsheet, {
    "Content-Type": "multipart/form-data",
  });
export const updateQsheetList = (id, data) =>
  api.update(`${url.GET_QSHEET_LIST}/${id}`, data, {
    "Content-Type": "multipart/form-data",
  });
export const deleteQsheetList = (qsheet) =>
  api.delete(url.DELETE_QSHEET, { headers: { qsheet } });

export const getQSheetCardDetails = (id) =>
  api.get(`${url.GET_QSHEET_LIST}/${id}`);

export const getQsheetLogList = () => {
  return api.get(url.GET_QSHEET_HISTORY_LIST).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};
