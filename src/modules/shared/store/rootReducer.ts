import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../../auth/data/authSlice";

import layoutReducer from "./slices/layout/layoutSlice";
import modalReducer from "./slices/modal/modalSlice";
import themeReducer from "./slices/theme/themeSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  modal: modalReducer,

  layout: layoutReducer,
});

export default rootReducer;
