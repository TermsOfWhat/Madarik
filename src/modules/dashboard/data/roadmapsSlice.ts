import { createSlice } from '@reduxjs/toolkit';
import { fetchRoadmaps } from './roadmapsThunk';

interface Roadmap {
  id: string;
  name: string;
  description: string;
  numberOfTopics: number;
  estimatedTime: string;
  difficulty: string;
}

interface RoadmapsState {
  data: Roadmap[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RoadmapsState = {
  data: [],
  isLoading: false,
  error: null,
};

const roadmapsSlice = createSlice({
  name: 'roadmaps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoadmaps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoadmaps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchRoadmaps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default roadmapsSlice.reducer;
