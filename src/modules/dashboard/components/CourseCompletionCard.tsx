'use client';

import type React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { Award, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CourseCompletionCardProps {
  courseName: string;
  courseDescription: string;
  onNextCourse: () => void;
}

export const CourseCompletionCard: React.FC<CourseCompletionCardProps> = ({
  courseName,
  courseDescription,
  onNextCourse,
}) => {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.1, 0.3) },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.1, 0.3) },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="course-completion-card">
      <div className="completion-content">
        <div className="completion-header">
          <motion.div
            className="trophy-container"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <div className="trophy-wrapper">
              <Award className="trophy-icon" size={48} />
            </div>
            <motion.div
              className="trophy-glow"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="sparkle"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: 'easeInOut',
              }}
            >
              <Sparkles size={64} className="sparkle-icon" />
            </motion.div>
          </motion.div>
          <div className="completion-text">
            <h2>Congratulations!</h2>
            <h3>You've completed {courseName}</h3>
          </div>
        </div>

        <div className="completion-details">
          <p>{courseDescription}</p>
          <div className="completion-progress">
            <div className="progress-bar-complete">
              <div className="progress-fill"></div>
              <div className="progress-label">
                <span>100%</span>
                <CheckCircle size={16} />
              </div>
            </div>
          </div>

          <div className="completion-actions">
            <Button
              type="default"
              size="large"
              className="next-course-button"
              onClick={onNextCourse}
            >
              Complete your Roadmap <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
