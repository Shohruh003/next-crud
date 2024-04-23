import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { commonReducers } from "./common"; 

const rootReducer = combineReducers({
  common: commonReducers, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
