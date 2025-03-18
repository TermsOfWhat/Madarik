import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { fetchTopicQuiz, submitQuizAnswer, fetchQuizResults } from '../../data/quizThunk';
import { nextQuestion, updateTimeRemaining } from '../../data/quizSlice';
import QuizQuestion from '../../components/QuizQuestion/QuizQuestion';
import LoadingDots from '@src/modules/shared/components/LoadingDots/LoadingDots';
import { Card } from 'antd';

const QuizDetailPage: React.FC = () => {
  const { roadmapId, topicId } = useParams();
  const { 
    questions, 
    currentQuestionIndex, 
    isLoading, 
    currentAnswer,
    answers, 
    results,
    topic,
    timeRemaining
  } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [hasAnswered, setHasAnswered] = useState(false);

  const [questionOptions, setQuestionOptions] = useState<Record<string, any>>({});

  const currentQuestion = useMemo(() => 
    questions[currentQuestionIndex], 
    [questions, currentQuestionIndex]
  );

  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;

  useEffect(() => {
    if (currentQuestion && !questionOptions[currentQuestion.id]) {
      setQuestionOptions(prev => ({
        ...prev,
        [currentQuestion.id]: currentQuestion.possibleAnswers.map(answer => ({
          id: answer.id,
          text: answer.answer,
          isCorrect: false
        }))
      }));
    }
  }, [currentQuestion?.id]);

  const currentOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return currentQuestion.possibleAnswers.map(answer => ({
      id: answer.id,
      text: answer.answer,
      isCorrect: currentAnswer?.isCorrect && answers[currentQuestion.id] === answer.id
    }));
  }, [currentQuestion, currentAnswer, answers]);

  useEffect(() => {
    if (roadmapId && topicId) {
      dispatch(fetchTopicQuiz({ roadmapId, topicId }));
    }
  }, [roadmapId, topicId, dispatch]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (timeRemaining > 0) {
      timerInterval = setInterval(() => {
        dispatch(updateTimeRemaining(timeRemaining - 1));
      }, 1000);
    } else if (timeRemaining === 0) {
      handleNext();
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timeRemaining, dispatch]);

  useEffect(() => {
    setHasAnswered(false);
    dispatch(updateTimeRemaining(20));
  }, [currentQuestionIndex, dispatch]);

  useEffect(() => {
    if (results) {
      navigate(`/quiz/${roadmapId}/${topicId}/results`);
    }
  }, [results, navigate, roadmapId, topicId]);

  const handleAnswerSelect = async (selectedAnswers: string[]) => {
    if (!hasAnswered && roadmapId && topicId && selectedAnswers.length > 0) {
      setHasAnswered(true);
      const result = await dispatch(submitQuizAnswer({
        roadmapId,
        topicId,
        questionId: currentQuestion?.id || '',
        answerId: selectedAnswers[0]
      }));
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
      setHasAnswered(false);
    } else {
      try {
        await dispatch(fetchQuizResults({ roadmapId: roadmapId!, topicId: topicId! })).unwrap();
      } catch (error) {
        console.error('Failed to fetch quiz results:', error);
      }
    }
  };

  if (!roadmapId || !topicId) {
    return <Navigate to="/" replace />;
  }

  if (isLoading && questions.length === 0) {
    return (
      <LoadingDots 
        message={{
          title: "Your Quiz is About to Begin!",
          subtitle: "Sharpen your focus—questions are coming soon..."
        }}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-4">
        <h1 className="text-2xl font-bold mb-2">
          {topic?.name || 'Quiz'}
        </h1>
        <p className="text-gray-600">
          {topic?.description || 'Test your knowledge on this topic'}
        </p>
      </Card>
      <QuizQuestion
        question={{
          id: currentQuestion?.id,
          text: currentQuestion?.question,
          type: 'single',
          options: currentOptions as { id: string; text: string; isCorrect: boolean }[],
          timeLimit: 20,
          explanation: currentAnswer?.explanation || undefined,
          questionNumber: currentQuestionNumber,
          totalQuestions: totalQuestions
        }}
        selectedAnswers={answers[currentQuestion?.id] ? [answers[currentQuestion?.id]] : []}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNext}
        timeRemaining={timeRemaining}
        isAnswered={hasAnswered}
      />
    </div>
  );
};

export default QuizDetailPage;
