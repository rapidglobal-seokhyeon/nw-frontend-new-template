import { APIClient } from "../api_helper";
import * as url from "../url_helper";

const api = new APIClient();

export async function apiGetOrgList() {
  return api.get(`${url.GET_ORG_LIST}`);
}
