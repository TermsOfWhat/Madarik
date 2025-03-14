"use client";

import { Typography, Button, Space } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { QuizQuestion } from "./index";
import styles from "./QuizResults.module.scss";

const { Title, Text } = Typography;

interface QuizResultsProps {
  questions: QuizQuestion[];
  userAnswers: number[];
  onRetry: () => void;
}

function QuizResults({ questions, userAnswers, onRetry }: QuizResultsProps) {
  return (
    <div className={styles.resultsContainer}>
      <Title level={4} className={styles.resultsTitle}>
        Quiz Results
      </Title>

      <div className={styles.questionsList}>
        {questions.map((question, index) => {
          const isCorrect = userAnswers[index] === question.correctAnswer;
          const userAnswerText =
            userAnswers[index] >= 0
              ? question.options[userAnswers[index]]
              : "No answer";
          const correctAnswerText = question.options[question.correctAnswer];

          return (
            <div
              key={question.id}
              className={`${styles.resultItem} ${
                isCorrect ? styles.correct : styles.incorrect
              }`}
            >
              <div className={styles.resultHeader}>
                {isCorrect ? (
                  <CheckCircleFilled className={styles.correctIcon} />
                ) : (
                  <CloseCircleFilled className={styles.incorrectIcon} />
                )}
                <Title level={5} className={styles.questionText}>
                  {index + 1}. {question.question}
                </Title>
              </div>

              <div className={styles.answerSection}>
                <Text className={styles.userAnswer}>
                  Your answer: {userAnswerText}
                </Text>

                {!isCorrect && (
                  <Text className={styles.correctAnswer}>
                    Correct answer: {correctAnswerText}
                  </Text>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.actionButtons}>
        <Button type="primary" onClick={onRetry} className={styles.retryButton}>
          Retry Quiz
        </Button>
      </div>
    </div>
  );
}

export default QuizResults;
