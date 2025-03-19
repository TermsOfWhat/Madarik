import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../../auth/data/authSlice";

import layoutReducer from "./slices/layout/layoutSlice";
import modalReducer from "./slices/modal/modalSlice";
import themeReducer from "./slices/theme/themeSlice";
import quizReducer from "../../quiz/data/quizSlice";
import pathSlice from "@src/modules/LearningPath/data/pathSlice";
import analyticsReducer from "../../dashboard/data/analyticsSlice";
import roadmapsReducer from "../../dashboard/data/roadmapsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  modal: modalReducer,
  layout: layoutReducer,
  quiz: quizReducer,
  roadmap: pathSlice,
  analytics: analyticsReducer,
  roadmaps: roadmapsReducer,
});

export default rootReducer;
