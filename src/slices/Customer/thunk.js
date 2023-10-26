import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerList as getCustomerListApi} from "../../helpers/customer_helper";


export const getCustomer = createAsyncThunk("Customer/getCustomer", async () => {
  try {
    const response = getCustomerListApi();
    return response;
  } catch (error) {
    return error;
  }
});