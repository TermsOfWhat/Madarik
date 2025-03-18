"use client";

import type React from "react";
import { useEffect, useCallback, memo, useRef, useState } from "react";
import { Card, Progress, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  CheckOutlined,
  CloseOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import "./_QuizResult.scss";
import LoadingDots from "@src/modules/shared/components/LoadingDots/LoadingDots";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  onRetryCurrentQuiz?: () => void;
}

const triggerConfetti = (duration: number) => {
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    shapes: ["circle" as const, "square" as const],
    colors: ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"],
  };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval: number = window.setInterval(() => {
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

    if (Math.random() > 0.8) {
      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 1.2,
        shapes: ["star" as const],
        origin: { x: 0.5, y: 0.5 },
      });
    }
  }, 250);

  return interval;
};

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  onRetry,
  onRetryCurrentQuiz,
}) => {
  const congratsAudioRef = useRef(new Audio("/audio/congratulation.mp3.mp3"));
  const failAudioRef = useRef(new Audio("/audio/fail.mp3"));
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);

  console.log("hasInteracted", hasInteracted);
  console.log("audioError", audioError);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowCard(true);

        const playAudio = async () => {
          try {
            if (score >= 80) {
              await congratsAudioRef.current.play();
              console.log("Success audio played successfully");
              triggerConfetti(3000);
            } else {
              await failAudioRef.current.play();
              console.log("Fail audio played successfully");
            }
          } catch (error) {
            console.error("Audio play failed:", error);
            if (score >= 80) {
              triggerConfetti(3000);
            }
          }
        };
        playAudio();
      }, 300);
    }, 1500);

    return () => clearTimeout(timer);
  }, [score]);

  useEffect(() => {
    const preloadAudio = () => {
      [congratsAudioRef.current, failAudioRef.current].forEach((audio) => {
        audio.addEventListener("error", (e) => {
          console.error("Audio file failed to load:", e);
          console.error("Audio source:", audio.src);
          setAudioError(true);
        });
      });
    };

    preloadAudio();

    return () => {
      [congratsAudioRef.current, failAudioRef.current].forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      console.log("User interaction detected");
      setHasInteracted(true);
    };

    document.addEventListener("click", handleInteraction, { once: true });
    return () => document.removeEventListener("click", handleInteraction);
  }, []);

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

  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <AnimatePresence>
      {showCard && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="quiz-result"
        >
          <Card className={`result-card ${isSuccess ? "success" : "failure"}`}>
            <div className="result-content">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3,
                }}
                className={`icon-container ${
                  isSuccess ? "success" : "failure"
                }`}
              >
                {isSuccess ? (
                  <TrophyOutlined className="result-icon" />
                ) : (
                  <CloseOutlined className="result-icon" />
                )}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="result-title"
              >
                {isSuccess ? "Congratulations! 🎉" : "Better Luck Next Time"}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="result-subtitle"
              >
                You scored{" "}
                <span
                  className={`score-highlight ${
                    isSuccess ? "success" : "failure"
                  }`}
                >
                  {formattedScore}%
                </span>
                <span className="score-detail">
                  ({correctAnswers}/{totalQuestions} correct)
                </span>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.9,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="progress-container"
              >
                <Progress
                  type="circle"
                  percent={Number(formattedScore)}
                  format={() => (isSuccess ? <CheckOutlined /> : null)}
                  className="result-progress"
                  strokeWidth={10}
                  strokeColor={isSuccess ? "#22c55e" : "#ef4444"}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="score-message"
              >
                {isSuccess ? (
                  <span>Great job! You've mastered this quiz!</span>
                ) : (
                  <span>Don't worry! Practice makes perfect.</span>
                )}
              </motion.div>

              <div className="buttons-container">
                {!isSuccess && onRetryCurrentQuiz && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                    className="retry-button-container"
                  >
                    <Button
                      onClick={handleRetryCurrentQuiz}
                      className="retry-same-button"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                )}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                  className="next-button-container"
                >
                  <Button onClick={handleRetry} className="try-another-button">
                    Return to Topic
                  </Button>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(QuizResult);