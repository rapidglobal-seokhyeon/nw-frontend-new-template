import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

export const getOrgList = () => {
  return api.get(url.GET_ORGANIZATION).catch((err) => {
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

export const updateOrgEnabled = (orgSeq, orgEnabled) => {
  return api
    .update(url.PATCH_ORG_ENABLED + "/" + orgSeq, orgEnabled)
    .catch((err) => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          default:
            message = "승인 실패";
            break;
        }
      }
      throw message;
    });
};
