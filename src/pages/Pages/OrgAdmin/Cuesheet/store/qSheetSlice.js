import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import {
  deleteQsheetList,
  getQsheetList,
} from "@/helpers/Cuesheet/cuesheet_helper";

export const SLICE_NAME = "qsheetDataList";

// getList는 Redux Toolkit의 createAsyncThunk 함수를 사용하여 생성된 비동기 액션 생성자
// 이 함수는 비동기적인 작업을 수행하고 해당 작업이 완료되면 Redux 스토어의 상태를 업데이트하는 데 사용
export const getList = createAsyncThunk(SLICE_NAME + "/getList", async () => {
  const response = await getQsheetList();

  return response.data;
});

export const deleteList = async (data) => {
  const response = await deleteQsheetList(data);

  return response.data;
};

const initialState = {
  loading: false,
  qSheetDataList: [],
  content: [],
  selectedQSheet: "",
  deleteConfirmation: false,
  selectedRows: [],
  selectedRow: "",
  dialogView: "",
  dialogOpen: false,
};

const qSheetDataListSlice = createSlice({
  name: `${SLICE_NAME}/state`,
  initialState,
  reducers: {
    setSelectedQSheet: (state, action) => {
      state.selectedQSheet = action.payload.content;
      //action.payload인지 아닌지 몰겠음. 개발하면서 확인 필요함
    },
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload.content;
      //action.payload인지 아닌지 몰겠음. 개발하면서 확인 필요함
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
      console.log(state.selectedRows);
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
      console.log("setSelectedRow ? ", state.selectedRow);
    },
    // toggleSort: (state, action) => {
    //     state.query.sort = action.payload
    // },
    // setSearch: (state, action) => {
    //     state.query.search = action.payload
    // },
    // toggleNewProjectDialog: (state, action) => {
    //     state.newProjectDialog = action.payload
    // },
    removeRowItem: (state, { payload }) => {
      const currentState = current(state);
      console.log("currentState ? ", currentState);
      if (currentState.selectedRows.includes(payload)) {
        state.selectedRows = currentState.selectedRows.filter(
          (id) => id !== payload
        );
      }
      console.log("removeRowItem ? ", state);
    },
    openDialog: (state) => {
      state.dialogOpen = true;
    },
    closeDialog: (state) => {
      state.dialogOpen = false;
      state.dialogView = "";
    },
    updateDialogView: (state, action) => {
      state.dialogView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.fulfilled, (state, action) => {
        state.qSheetDataList = action.payload.content;
        state.loading = false;
      })
      .addCase(getList.pending, (state) => {
        state.loading = true;
      });
  },
});

export const {
  setSelectedQSheet,
  toggleDeleteConfirmation,
  setSelectedRow,
  setSelectedRows,
  removeRowItem,
  updateDialogView,
  openDialog,
  closeDialog,
} = qSheetDataListSlice.actions;
export default qSheetDataListSlice.reducer;
