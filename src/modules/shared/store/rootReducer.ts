import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../../auth/data/authSlice";

import layoutReducer from "./slices/layout/layoutSlice";
import modalReducer from "./slices/modal/modalSlice";
import themeReducer from "./slices/theme/themeSlice";
import quizReducer from "../../quiz/store/quizSlice";
import pathSlice from "@src/modules/LearningPath/data/pathSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  modal: modalReducer,

  layout: layoutReducer,
  quiz: quizReducer,
  roadmap: pathSlice,
});

export default rootReducer;
