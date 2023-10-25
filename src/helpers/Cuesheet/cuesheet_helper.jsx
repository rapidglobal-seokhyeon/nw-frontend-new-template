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
  })}

export const addQsheetList = (qsheet) => api.create(url.ADD_NEW_QSHEET, qsheet);
export const updateQsheetList = (qsheet) => api.put(url.UPDATE_QSHEET, qsheet);
export const deleteQsheetList = (qsheet) => api.delete(url.DELETE_QSHEET, { headers: { qsheet } });


