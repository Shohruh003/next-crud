import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { commonReducers } from "./common";
import { appSlice } from "./slice/app.slice";

const rootReducer = combineReducers({
  [appSlice.reducerPath]: appSlice.reducer,
  common: commonReducers,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
