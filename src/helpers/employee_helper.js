import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

export const getEmployee = () => {
  return api.get(url.GET_EMPLOYEES).catch((err) => {
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