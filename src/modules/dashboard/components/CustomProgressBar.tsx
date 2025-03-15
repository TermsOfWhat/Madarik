"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "antd";
import AnimatedTrophy from "../../shared/components/animated-trophy/animated-trophy";

interface CustomProgressBarProps {
  progress: number;
  totalModules: number;
  completedModules: number;
}

export function CustomProgressBar({
  progress,
  totalModules,
  completedModules,
}: CustomProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="custom-progress-container">
      <div className="custom-progress-bar" ref={progressBarRef}>
        <motion.div
          className={`custom-progress-fill ${isAnimating ? "pulse-animation" : ""}`}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div
          className="custom-progress-indicator"
          style={{ left: `${progress}%` }}
        >
          <span className="custom-progress-text">{progress}%</span>
        </div>
        <div className="custom-progress-icon">
          <Tooltip
            title={`${completedModules} of ${totalModules} modules completed`}
          >
            <AnimatedTrophy />
          </Tooltip>
        </div>
      </div>
    </div>
  );
} 