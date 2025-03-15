import { createSlice } from "@reduxjs/toolkit";
import { IPathState } from "./pathTypes";
import { fetchRoadmap, fetchRoadmapById, fetchRoadmapTopic } from "./pathThunk";

// Basic type definitions

// Initial state
const initialState: IPathState = {
  roadmap: null,
  topic: null,
  isLoading: false,
  isTopicLoading: false,
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
  },
});

// Export actions and reducer
export const {} = pathSlice.actions;

export default pathSlice.reducer;
