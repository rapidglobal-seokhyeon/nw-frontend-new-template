import { combineReducers } from "@reduxjs/toolkit";
import reducers from "./qSheetSlice";
import { useSelector } from "react-redux";

const reducer = combineReducers({
  data: reducers,
});

export const useAppSelector = useSelector;

export * from "./qSheetSlice";
// projectListSlice에서 내보낸 모든 내용을 외부로 내보냅니다.
//  이것은 다른 파일에서 projectListSlice의 내용을 가져올 때 사용됩니다.
export { useAppDispatch } from "@/store";
// useAppDispatch를 외부로 내보냅니다. 이것은 Redux 스토어의 dispatch 함수에 접근할 때 사용됩니다.
export default reducer;
// reducer 변수를 기본 내보내기로 내보냅니다. 이것은 Redux 스토어의 루트 리듀서로 사용됩니다.
