import React, { useEffect } from 'react';
import { Card, Result, Progress, Button } from 'antd';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RedoOutlined } from '@ant-design/icons';
import './_QuizResult.scss';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  onRetryCurrentQuiz?: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  onRetry,
  onRetryCurrentQuiz,
}) => {
  useEffect(() => {
    if (score >= 80) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: number = window.setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="quiz-result"
    >
      <Card className="result-card">
        <Result
          status={score >= 80 ? 'success' : 'info'}
          title={
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="result-title"
            >
              {score >= 80 ? 'Congratulations! 🎉' : 'Quiz Completed'}
            </motion.div>
          }
          subTitle={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="result-subtitle"
            >
              You scored {score.toFixed(2)}% (
              {Math.round((score * totalQuestions) / 100)}/{totalQuestions}{' '}
              correct)
            </motion.div>
          }
          extra={[
            <motion.div
              key="progress"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Progress
                type="circle"
                percent={Number(score.toFixed(2))}
                status={score >= 80 ? 'success' : 'normal'}
                className="result-progress"
              />
            </motion.div>,
            score < 80 && onRetryCurrentQuiz && (
              <motion.div
                key="retry-button"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ marginBottom: '1rem' }}
              >
                <Button
                  type="primary"
                  onClick={onRetryCurrentQuiz}
                  className="retry-same-button"
                  icon={<RedoOutlined />}
                >
                  Try Again
                </Button>
              </motion.div>
            ),
            <motion.div
              key="button"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button type="primary" onClick={onRetry} className="retry-button">
                Try Another Quiz
              </Button>
            </motion.div>,
          ]}
        />
      </Card>
    </motion.div>
  );
};

export default QuizResult;
