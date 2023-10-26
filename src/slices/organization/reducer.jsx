import { createSlice } from "@reduxjs/toolkit";
import { deleteOrg, getOrg, updateOrgEnabled } from "./thunk";

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
      console.log(action.payload)
      state.error = action.payload || null;
    });
    builder.addCase(updateOrgEnabled.fulfilled, (state, action) => {
      console.log(action.payload)
      state.content = state.content.map((org) =>
        org.orgSeq.toString() === action.payload.content.orgSeq.toString()
          ? { ...org, ...action.payload.content }
          : org
      );
    });
    builder.addCase(updateOrgEnabled.rejected, (state, action) => {
      console.log(action.payload)
      state.error = action.payload || null;
    });
    builder.addCase(deleteOrg.fulfilled, (state, action) => {
      state.content = state.content.filter(
        (org) => org.orgSeq !== action.payload
      );
    });
  },
});

export default organizationSlice.reducer;
