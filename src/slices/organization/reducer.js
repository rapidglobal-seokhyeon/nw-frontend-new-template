import { createSlice } from "@reduxjs/toolkit";
import { getOrg, updateOrgEnabled } from "./thunk";

export const initialState = {
  content: [],
  error: "",
};

const organizationSlice = createSlice({
  name: "Org",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrg.fulfilled, (state, action) => {
      state.content = action.payload.content;
      console.log(action.payload.content);
    });
    builder.addCase(getOrg.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(updateOrgEnabled.fulfilled, (state, action) => {
      state.content = state.content.map((org) =>
        org.orgSeq.toString() === action.payload.content.orgSeq.toString()
          ? { ...org, ...action.payload.content }
          : org
      );
    });
  },
});

export default organizationSlice.reducer;
