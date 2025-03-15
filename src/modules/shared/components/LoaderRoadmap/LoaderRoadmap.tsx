import { useState, useEffect, useRef } from "react";
import { Spin } from "antd";
import "./LoaderRoadmap.scss";

interface LoaderRoadmapProps {
  isLoading: boolean;
  message?: string;
}

function LoaderRoadmap({
  isLoading,
  message = "Roadmap generation may take a few seconds...",
}: LoaderRoadmapProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [displayMessage, setDisplayMessage] = useState("");
  const lastUpdateTime = useRef(0);

  // Define more granular loading phases for smoother progression
  const loadingPhases = [
    { message: "Analyzing your request...", percentage: 15 },
    { message: "Processing learning topics...", percentage: 30 },
    { message: "Gathering learning resources...", percentage: 45 },
    { message: "Organizing content modules...", percentage: 60 },
    { message: "Structuring your personalized roadmap...", percentage: 75 },
    { message: "Finalizing your learning path...", percentage: 90 },
    { message: "Almost ready...", percentage: 98 },
  ];

  // Reset progress when loading state changes
  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setCurrentPhase(0);
      setDisplayMessage(loadingPhases[0].message);
      lastUpdateTime.current = Date.now();
    }
  }, [isLoading]);

  // Smooth message transition
  useEffect(() => {
    if (!isLoading) return;

    if (currentPhase < loadingPhases.length) {
      // Use a fade effect for message changes
      const element = document.querySelector(".loader-roadmap-subtitle");
      if (element) {
        element.classList.add("message-fade-out");

        // After fade out, change the message and fade in
        setTimeout(() => {
          setDisplayMessage(loadingPhases[currentPhase].message);
          element.classList.remove("message-fade-out");
          element.classList.add("message-fade-in");

          // Remove the fade-in class after animation completes
          setTimeout(() => {
            element.classList.remove("message-fade-in");
          }, 300);
        }, 300);
      }
    }
  }, [currentPhase, isLoading, loadingPhases]);

  // Progress animation with adaptive speed
  useEffect(() => {
    if (!isLoading) return;

    // Phase advancement - slightly randomized timing for more natural feel
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prevPhase) => {
        const nextPhase =
          prevPhase < loadingPhases.length - 1 ? prevPhase + 1 : prevPhase;
        return nextPhase;
      });
    }, 500); // Between 1-2 seconds

    // Smooth progress animation using requestAnimationFrame for better performance
    let animationFrameId: number;

    const updateProgress = () => {
      const now = Date.now();
      const delta = now - lastUpdateTime.current;
      lastUpdateTime.current = now;

      setProgress((prevProgress) => {
        // Target is the percentage of current phase
        const target = loadingPhases[currentPhase].percentage;

        // Calculate distance to target
        const distance = target - prevProgress;

        if (distance <= 0) {
          return prevProgress; // Already at or beyond target
        }

        // Adaptive increment: faster when far from target, slower when approaching
        const speedFactor = Math.max(0.1, Math.min(0.5, distance / 30));
        const increment = speedFactor * (delta / 16); // Scale by time delta, normalized to ~60fps

        return Math.min(target, prevProgress + increment);
      });

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      clearInterval(phaseInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoading, currentPhase, loadingPhases]);

  if (!isLoading) return null;

  return (
    <div className="loader-roadmap-container">
      <div className="loader-roadmap-content">
        <Spin size="large" className="loader-roadmap-spinner" />
        <div className="loader-roadmap-message">
          <p className="loader-roadmap-title">
            Creating your personalized learning path
          </p>
          <p className="loader-roadmap-subtitle">{displayMessage}</p>
          <div className="loader-roadmap-progress">
            <div
              className="loader-roadmap-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="loader-roadmap-info">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default LoaderRoadmap;
