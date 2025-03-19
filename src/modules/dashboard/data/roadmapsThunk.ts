import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@src/modules/shared/utils/axios";

export const fetchRoadmaps = createAsyncThunk(
  "roadmaps/fetchRoadmaps",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/roadmaps");
      
      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.data.message);
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch roadmaps");
    }
  }
); 