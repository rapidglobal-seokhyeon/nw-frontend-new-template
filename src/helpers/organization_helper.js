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

// export const updateOrgEnabled = (orgSeq, org) => {
//   console.log("orgSeq: ", orgSeq);
//   console.log("org: ", org);
//   return api.update(url.PATCH_ORG_ENABLED + "/" + orgSeq, org).catch((err) => {
//     var message;
//     if (err.response && err.response.status) {
//       console.log(err.response);
//       switch (err.response.status) {
//         default:
//           message = err.response;
//           break;
//       }
//     }
//     return message
//   });
// };
export const updateOrgEnabled = (orgSeq, org) => {
  return api.update(url.PATCH_ORG_ENABLED + "/" + orgSeq, org)
    .then(() => {
      return "success"; // 성공 시 "success" 반환
    })
    .catch((err) => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          default:
            message = err.response;
            break;
        }
      }
      return message;
    });
};

// export const updateOrgEnabled = (orgSeq, org) =>
//   api.update(url.PATCH_ORG_ENABLED + "/" + orgSeq, org);

export const deleteOrganization = (orgSeq) => {
  console.log("orgSeq: ", orgSeq);
  return api.delete(url.DELETE_ORGANIZATION + "/" + orgSeq).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        default:
          message = "삭제 실패";
          break;
      }
    }
    throw message;
  });
};
