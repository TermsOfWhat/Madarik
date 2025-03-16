import React, { useEffect, useCallback, memo, useRef } from 'react';
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

const triggerConfetti = (duration: number) => {
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

  return interval;
};

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  onRetry,
  onRetryCurrentQuiz,
}) => {
  const congratsAudioRef = useRef(new Audio('/audio/congratulations.mp3'));

  useEffect(() => {
    let interval: number | undefined;

    if (score >= 80) {
      congratsAudioRef.current.play().catch(err => {
        console.log('Failed to play congratulations sound:', err);
      });
      
      interval = triggerConfetti(3000);
    }

    return () => {
      if (interval) clearInterval(interval);
      // Cleanup audio
      congratsAudioRef.current.pause();
      congratsAudioRef.current.currentTime = 0;
    };
  }, [score]);

  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  const handleRetryCurrentQuiz = useCallback(() => {
    if (onRetryCurrentQuiz) {
      onRetryCurrentQuiz();
    }
  }, [onRetryCurrentQuiz]);

  const formattedScore = score.toFixed(2);
  const correctAnswers = Math.round((score * totalQuestions) / 100);
  const isSuccess = score >= 80;

  const fadeInAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="quiz-result"
    >
      <Card className="result-card">
        <Result
          status={isSuccess ? 'success' : 'info'}
          title={
            <motion.div
              {...fadeInAnimation}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="result-title"
            >
              {isSuccess ? 'Congratulations! 🎉' : 'Quiz Completed'}
            </motion.div>
          }
          subTitle={
            <motion.div
              {...fadeInAnimation}
              transition={{ delay: 0.4 }}
              className="result-subtitle"
            >
              You scored {formattedScore}% ({correctAnswers}/{totalQuestions}{' '}
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
                percent={Number(formattedScore)}
                status={isSuccess ? 'success' : 'normal'}
                className="result-progress"
              />
            </motion.div>,
            !isSuccess && onRetryCurrentQuiz && (
              <motion.div
                key="retry-button"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ marginBottom: '1rem' }}
              >
                <Button
                  type="primary"
                  onClick={handleRetryCurrentQuiz}
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
              <Button
                type="primary"
                onClick={handleRetry}
                className="retry-button"
              >
                Try Another Quiz
              </Button>
            </motion.div>,
          ]}
        />
      </Card>
    </motion.div>
  );
};

export default memo(QuizResult);
