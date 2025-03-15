import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchRoadmapParams,
  FetchRoadmapTopicParams,
  Roadmap,
  RoadmapTopic,
} from "./pathTypes";
import axiosInstance from "@src/modules/shared/utils/axios";
import { handleError } from "@src/modules/shared/utils/errorMessage";

export const fetchRoadmap = createAsyncThunk<Roadmap, FetchRoadmapParams>(
  "learningPath/fetchRoadmap",
  async (params) => {
    try {
      const response = await axiosInstance.post(`/api/roadmaps`, params);

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.data.message);
    } catch (error) {
      return handleError(error, "Failed to fetch roadmap");
    }
  }
);

export const fetchRoadmapById = createAsyncThunk<Roadmap, string>(
  "learningPath/fetchRoadmapById",
  async (roadmapId) => {
    try {
      const response = await axiosInstance.get(`/api/roadmaps/${roadmapId}`);

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.data.message);
    } catch (error) {
      return handleError(error, "Failed to fetch roadmap by ID");
    }
  }
);

export const fetchRoadmapTopic = createAsyncThunk<
  RoadmapTopic,
  FetchRoadmapTopicParams
>("learningPath/fetchRoadmapTopic", async (params) => {
  try {
    const { roadmapId, id } = params;
    const response = await axiosInstance.get(
      `/api/roadmaps/${roadmapId}/topics/${id}`
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  } catch (error) {
    return handleError(error, "Failed to fetch topic");
  }
});
