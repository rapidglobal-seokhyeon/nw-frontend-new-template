import {
  configureStore,
  Action,
  Reducer,
  AnyAction,
  Store,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PERSIST_STORE_NAME } from "@/constants/app.constant";
import rootReducer from "./rootReducer";
import RtkQueryService from "@/services/RtkQueryService";

const middlewares = [RtkQueryService.middleware];

const persistConfig = {
  key: PERSIST_STORE_NAME,
  keyPrefix: "",
  storage,
  whitelist: ["auth", "locale"],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer()),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === "development",
});

store.asyncReducers = {};

export const persistor = persistStore(store);

export function injectReducer(key, reducer) {
  if (store.asyncReducers) {
    if (store.asyncReducers[key]) {
      return false;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(
      persistReducer(persistConfig, rootReducer(store.asyncReducers))
    );
  }
  persistor.persist();
  return store;
}

export default store;
