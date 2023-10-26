import { createSlice } from "@reduxjs/toolkit"
import { getEmployee } from "./thunks"

export const initialState = {
  content: [],
  error: "",
}

const employeeSlice = createSlice({
  name: "Employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployee.fulfilled, (state, action) => {
      state.content = action.payload.content
    })
  }
})

export default employeeSlice.reducer