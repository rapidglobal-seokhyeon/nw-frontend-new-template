import { createSlice } from "@reduxjs/toolkit";
import { getQsheetList, addQsheetList, updateQsheetList, deleteQsheetList } from './thunk';
export const initialState = {
    qsheetList: [],
    error: {},
};


const QsheetsSlice = createSlice({
    name: 'QsheetsSlice',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getQsheetList.fulfilled, (state, action) => {
            state.qsheetList = action.payload.content;
        });
        builder.addCase(getQsheetList.rejected, (state, action) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(addQsheetList.fulfilled, (state, action) => {
            state.qsheetLists.push(action.payload);
        });
        builder.addCase(addQsheetList.rejected, (state, action) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(updateQsheetList.fulfilled, (state, action) => {
            state.qsheetLists = state.qsheetLists.map(project =>
                project._id.toString() === action.payload.data._id.toString()
                    ? { ...project, ...action.payload.data }
                    : project
            );
        });
        builder.addCase(updateQsheetList.rejected, (state, action) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(deleteQsheetList.fulfilled, (state, action) => {
            state.qsheetLists = state.qsheetLists.filter(project => project.id.toString() !== action.payload.id.toString());
        });
        builder.addCase(deleteQsheetList.rejected, (state, action) => {
            state.error = action.payload.error || null;
        });
    }
});

export default QsheetsSlice.reducer;