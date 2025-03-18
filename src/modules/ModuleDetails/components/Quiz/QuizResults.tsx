import { Typography, Button } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import styles from "./QuizResults.module.scss";
import { QuizSubmissionResponse } from "@src/modules/LearningPath/data/pathTypes";

const { Title, Text } = Typography;

interface QuizResultsProps {
  result: QuizSubmissionResponse | null;

  onRetry: () => void;
}

function QuizResults({ result, onRetry }: QuizResultsProps) {
  return (
    <div className={styles.resultsContainer}>
      <Title level={4} className={styles.resultsTitle}>
        Quiz Results
      </Title>

      <div className={styles.questionsList}>
        {result?.submission.map((sub, index) => {
          const isCorrect = sub.isCorrect;
          const userAnswerText = sub.yourAnswer;
          const correctAnswerText = sub.correctAnswer;

          return (
            <div
              key={sub.question}
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
                  {index + 1}. {sub.question}
                </Title>
              </div>

              <div className={styles.answerSection}>
                <Text className={styles.userAnswer}>
                  Your answer: {userAnswerText}
                </Text>

                {!isCorrect && (
                  <>
                    <Text className={styles.correctAnswer}>
                      Correct answer: {correctAnswerText}
                    </Text>
                    {sub.explanation && (
                      <Text className={styles.explanation}>
                        <span>Explanation</span>: {sub.explanation}
                      </Text>
                    )}
                  </>
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
