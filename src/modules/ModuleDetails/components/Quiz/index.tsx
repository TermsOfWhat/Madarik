import { useState } from "react";
import { Radio, Button, Typography, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import QuizResults from "./QuizResults";
import styles from "./Quiz.module.scss";

const { Title, Text } = Typography;

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

interface QuizProps {
  title?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, totalQuestions: number) => void;
}

function Quiz({ title = "Mini Quiz", questions, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  );
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleOptionChange = (e: RadioChangeEvent) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = Number(e.target.value);
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (onComplete) {
        const score = selectedAnswers.reduce((total, selected, index) => {
          return total + (selected === questions[index].correctAnswer ? 1 : 0);
        }, 0);
        onComplete(score, questions.length);
      }
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
    setSelectedAnswers(Array(questions.length).fill(-1));
  };

  if (submitted) {
    return (
      <QuizResults
        questions={questions}
        userAnswers={selectedAnswers}
        onRetry={handleRetry}
      />
    );
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
          value={selectedAnswers[currentQuestionIndex]}
        >
          <Space direction="vertical" className={styles.optionsSpace}>
            {currentQuestion.options.map((option, index) => (
              <Radio key={index} value={index} className={styles.optionItem}>
                {option}
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
          disabled={selectedAnswers[currentQuestionIndex] === -1}
          className={styles.nextButton}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default Quiz;
