import { createSlice } from "@reduxjs/toolkit";
import { getOrganizationList } from "./thunk";

export const initialState = {
  content: {},
  error: "",
};

const organizationSlice = createSlice({
  name: "Org",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizationList.fulfilled, (state, action) => {
      state.content = action.payload.content;
      console.log(action.payload.content);
    });
    builder.addCase(getOrganizationList.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default organizationSlice.reducer;
