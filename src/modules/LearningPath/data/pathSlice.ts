import { createSlice } from "@reduxjs/toolkit";
import { IPathState } from "./pathTypes";
import {
  fetchChapterQuiz,
  fetchRoadmap,
  fetchRoadmapById,
  fetchRoadmapTopic,
  submitChapterQuiz,
} from "./pathThunk";

// Basic type definitions

// Initial state
const initialState: IPathState = {
  roadmap: null,
  topic: null,
  isLoading: false,
  isTopicLoading: false,
  chapterQuiz: {},
  isQuizLoading: false,
  miniQuizResult: {},
};

// Create the slice
const pathSlice = createSlice({
  name: "learningPath",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoadmap.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRoadmap.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roadmap = action.payload;
    });
    builder.addCase(fetchRoadmap.rejected, (state) => {
      state.isLoading = false;
    });

    // get roadmap by id
    builder.addCase(fetchRoadmapById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRoadmapById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roadmap = action.payload;
    });
    builder.addCase(fetchRoadmapById.rejected, (state) => {
      state.isLoading = false;
    });

    // get topic
    builder.addCase(fetchRoadmapTopic.pending, (state) => {
      state.isTopicLoading = true;
    });
    builder.addCase(fetchRoadmapTopic.fulfilled, (state, action) => {
      state.isTopicLoading = false;
      state.topic = action.payload;
    });
    builder.addCase(fetchRoadmapTopic.rejected, (state) => {
      state.isTopicLoading = false;
    });

    //get chapter quiz
    builder.addCase(fetchChapterQuiz.pending, (state) => {
      state.isQuizLoading = true;
    });
    builder.addCase(fetchChapterQuiz.fulfilled, (state, action) => {
      state.isQuizLoading = false;
      const chapterId = action.meta.arg.chapterId;
      state.chapterQuiz = {
        ...state.chapterQuiz,
        [chapterId]: action.payload,
      };
    });
    builder.addCase(fetchChapterQuiz.rejected, (state) => {
      state.isQuizLoading = false;
    });

    // submit quiz
    builder.addCase(submitChapterQuiz.pending, (state) => {
      state.isQuizLoading = true;
    });
    builder.addCase(submitChapterQuiz.fulfilled, (state, action) => {
      state.isQuizLoading = false;
      const chapterId = action.meta.arg.chapterId;
      state.miniQuizResult = {
        ...state.miniQuizResult,
        [chapterId]: action.payload,
      };
    });
    builder.addCase(submitChapterQuiz.rejected, (state) => {
      state.isQuizLoading = false;
    });
  },
});

// Export actions and reducer
export const {} = pathSlice.actions;

export default pathSlice.reducer;
