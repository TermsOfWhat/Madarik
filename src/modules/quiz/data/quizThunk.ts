import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchQuizParams, QuizAnswer, SubmitQuizAnswerParams, QuizResponse } from "./quizTypes";
import axiosInstance from "@src/modules/shared/utils/axios";
import { handleError } from "@src/modules/shared/utils/errorMessage";

export const fetchTopicQuiz = createAsyncThunk<QuizResponse, FetchQuizParams>(
  "quiz/fetchTopicQuiz",
  async (params) => {
    try {
      const { roadmapId, topicId } = params;
      const response = await axiosInstance.get(
        `/api/roadmaps/${roadmapId}/topics/${topicId}/quiz`
      );

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.data.message);
    } catch (error) {
      return handleError(error, "Failed to fetch quiz");
    }
  }
);

export const submitQuizAnswer = createAsyncThunk<QuizAnswer, SubmitQuizAnswerParams>(
  "quiz/submitAnswer",
  async (params) => {
    try {
      const { roadmapId, topicId, questionId, answerId } = params;
      const response = await axiosInstance.post(
        `/api/roadmaps/${roadmapId}/topics/${topicId}/quiz/submit`,
        {
          questionId,
          answerId,
        }
      );

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.data.message);
    } catch (error) {
      return handleError(error, "Failed to submit answer");
    }
  }
);

export const fetchQuizResults = createAsyncThunk(
  'quiz/fetchResults',
  async ({ roadmapId, topicId }: { roadmapId: string; topicId: string }) => {
    try {
      const response = await axiosInstance.get(
        `/api/roadmaps/${roadmapId}/topics/${topicId}/quiz/result`
      );

      if (response.status === 200) {
        return {
          totalQuestions: response.data.numberOfQuestions,
          correctAnswers: response.data.numberOfCorrectAnswers,
          score: response.data.score
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      return handleError(error, "Failed to fetch quiz results");
    }
  }
); 