import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchChapterQuizParams,
  FetchRoadmapParams,
  FetchRoadmapTopicParams,
  QuizQuestion,
  QuizSubmissionResponse,
  Roadmap,
  RoadmapTopic,
  SubmitQuizParams,
} from "./pathTypes";
import axiosInstance from "@src/modules/shared/utils/axios";
import { handleError } from "@src/modules/shared/utils/errorMessage";

export const fetchRoadmap = createAsyncThunk<Roadmap, FetchRoadmapParams>(
  "learningPath/fetchRoadmap",
  async (params, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/api/roadmaps`, params);

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.data.message);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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

export const fetchChapterQuiz = createAsyncThunk<
  QuizQuestion[],
  FetchChapterQuizParams
>("learningPath/fetchChapterQuiz", async (params) => {
  try {
    const { roadmapId, topicId, chapterId } = params;
    const response = await axiosInstance.get(
      `/api/roadmaps/${roadmapId}/topics/${topicId}/chapters/${chapterId}/quiz`
    );

    if (response.status === 200) {
      return response.data.questions;
    }

    throw new Error(response.data.message);
  } catch (error) {
    return handleError("there was an error generating the quiz");
  }
});

export const submitChapterQuiz = createAsyncThunk<
  QuizSubmissionResponse,
  SubmitQuizParams
>("learningPath/submitChapterQuiz", async (params, thunkAPI) => {
  try {
    const { roadmapId, topicId, chapterId, answers } = params;
    const response = await axiosInstance.post(
      `/api/roadmaps/${roadmapId}/topics/${topicId}/chapters/${chapterId}/quiz/submit`,
      answers
    );

    if (response.status === 200) {
      thunkAPI.dispatch(fetchRoadmapTopic({ roadmapId, id: topicId }));
      return response.data;
    }

    throw new Error(response.data.message);
  } catch (error) {
    return handleError(error, "Failed to submit quiz answers");
  }
});
