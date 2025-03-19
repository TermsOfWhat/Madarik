import { createAsyncThunk } from "@reduxjs/toolkit";
import { AnalyticsData } from "./analyticsTypes";
import axiosInstance from "@src/modules/shared/utils/axios";

export const fetchAnalytics = createAsyncThunk<AnalyticsData>(
  "analytics/fetchAnalytics",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/analytics");
      
      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.data.message);
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch analytics data");
    }
  }
); 