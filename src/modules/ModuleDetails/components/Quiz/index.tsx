import { useEffect, useState } from "react";
import { Radio, Button, Typography, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import QuizResults from "./QuizResults";
import styles from "./Quiz.module.scss";
import {
  fetchChapterQuiz,
  submitChapterQuiz,
} from "@src/modules/LearningPath/data/pathThunk";
import { useAppDispatch, useAppSelector } from "@src/modules/shared/store";
import { useParams } from "react-router-dom";
import { quizInChapter } from "@src/modules/LearningPath/data/pathTypes";

const { Title, Text } = Typography;

interface QuizProps {
  title?: string;
  onComplete?: (score: number, totalQuestions: number) => void;
  chapterId: string;
  quiz?: quizInChapter | null;
}

function Quiz({ title = "Mini Quiz", chapterId, quiz }: QuizProps) {
  const dispatch = useAppDispatch();
  const { chapterQuiz, miniQuizResult } = useAppSelector(
    (state) => state.roadmap
  );

  console.log("miniQuizResult", miniQuizResult);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    {
      questionId: string;
      answerId: string;
    }[]
  >([]);

  const [submitted, setSubmitted] = useState(false);

  const { pathId, moduleId } = useParams();

  if (!pathId || !moduleId || !chapterId) {
    return null;
  }

  console.log("quiz", quiz?.questions);
  console.log("chapterQuiz", chapterQuiz);
  useEffect(() => {
    if (!pathId || !moduleId || !chapterId) {
      return;
    }

    if (quiz) {
      return;
    }

    dispatch(
      fetchChapterQuiz({
        roadmapId: pathId,
        topicId: moduleId,
        chapterId: chapterId,
      })
    );
  }, [pathId, moduleId, chapterId, quiz]);

  const questions = quiz ? quiz.questions : chapterQuiz?.[chapterId];

  if (!questions || questions.length === 0) {
    return "loading...";
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleOptionChange = (e: RadioChangeEvent) => {
    setSelectedAnswers((prev) => {
      const newSelectedAnswers = prev.map((answer) => {
        if (answer.questionId === currentQuestion.id) {
          return { ...answer, answerId: e.target.value };
        }
        return answer;
      });

      if (newSelectedAnswers.length === currentQuestionIndex) {
        newSelectedAnswers.push({
          questionId: currentQuestion.id,
          answerId: e.target.value,
        });
      }

      return newSelectedAnswers;
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      dispatch(
        submitChapterQuiz({
          roadmapId: pathId,
          topicId: moduleId,
          chapterId: chapterId,
          answers: selectedAnswers,
        })
      );
      setSubmitted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
  };

  if (submitted) {
    return <QuizResults result={miniQuizResult} onRetry={handleRetry} />;
  }

  return (
    <div className={styles.quizContainer}>
      <Title level={4} className={styles.quizTitle}>
        {title}
      </Title>

      <Text className={styles.questionCounter}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>

      <div className={styles.questionSection}>
        <Title level={5} className={styles.questionText}>
          {currentQuestion.question}
        </Title>

        <Radio.Group
          className={styles.optionsGroup}
          onChange={handleOptionChange}
        >
          <Space direction="vertical" className={styles.optionsSpace}>
            {currentQuestion.possibleAnswers.map((answer) => (
              <Radio
                key={answer.id}
                value={answer.id}
                className={styles.optionItem}
                checked={
                  selectedAnswers[currentQuestionIndex]?.answerId === answer.id
                }
              >
                {answer.answer}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>

      <div className={styles.navigationButtons}>
        <Button
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          className={styles.prevButton}
        >
          Previous
        </Button>

        <Button
          type="primary"
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestionIndex]?.answerId}
          className={styles.nextButton}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default Quiz;
