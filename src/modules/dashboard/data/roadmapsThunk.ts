import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@src/modules/shared/utils/axios";
import { AxiosError } from "axios";

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

export const deleteRoadmap = createAsyncThunk(
  "roadmaps/deleteRoadmap",
  async (roadmapId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/api/roadmaps/${roadmapId}`);
      
      if (response.status === 200) {
        return roadmapId;
      }

      throw new Error(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || "Failed to delete roadmap";
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
); 
