import { combineReducers } from "redux";
import { contactReducer, userReducer } from "./reducer";

export const rootReducer = combineReducers({ contactReducer, userReducer });
