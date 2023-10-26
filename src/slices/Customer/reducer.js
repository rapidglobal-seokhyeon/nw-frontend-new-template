import { createSlice } from "@reduxjs/toolkit";
import { getCustomer } from "./thunk";

export const initialState = {
  content: [],
  error: "",
};

const customerSlice = createSlice({
  name: "Customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.content = action.payload.content;
      console.log(action.payload.content);
    });
  },
});

export default customerSlice.reducer;
