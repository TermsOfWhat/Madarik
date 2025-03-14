"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Skeleton, Tooltip } from "antd";
import {
  PlayCircle,
  BookOpen,
  Clock,
  BookMarked,
  Flame,
  ChevronRight,
} from "lucide-react";
import AnimatedTrophy from "../shared/components/animated-trophy/animated-trophy";
import "./dashboard.scss";

const mockCourseProgress = [
  {
    id: "react",
    name: "React Fundamentals",
    progress: 65,
    totalModules: 12,
    completedModules: 7,
  },
  {
    id: "nextjs",
    name: "Next.js Mastery",
    progress: 30,
    totalModules: 10,
    completedModules: 3,
  },
  {
    id: "typescript",
    name: "TypeScript Deep Dive",
    progress: 10,
    totalModules: 12,
    completedModules: 1,
  },
];

const mockRoadmaps = [
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Master modern frontend technologies and frameworks",
    modules: 12,
    estimatedTime: "3 months",
    level: "Beginner to Intermediate",
  },
  {
    id: "backend",
    name: "Backend Developer",
    description: "Learn server-side programming and database management",
    modules: 10,
    estimatedTime: "2.5 months",
    level: "Intermediate",
  },
  {
    id: "fullstack",
    name: "Full Stack JavaScript",
    description:
      "Become proficient in both frontend and backend JavaScript development",
    modules: 15,
    estimatedTime: "4 months",
    level: "Intermediate to Advanced",
  },
  {
    id: "devops",
    name: "DevOps Engineer",
    description: "Master CI/CD, containerization, and cloud infrastructure",
    modules: 8,
    estimatedTime: "2 months",
    level: "Advanced",
  },
];

const mockStats = [
  { label: "Learning Streak", value: "7 days", icon: Flame, color: "#f97316" },
  {
    label: "Modules Completed",
    value: "9",
    icon: BookMarked,
    color: "#3b82f6",
  },
  { label: "Quizzes Taken", value: "5", icon: PlayCircle, color: "#8b5cf6" },
];

const CustomProgressBar = ({
  progress,
  totalModules,
  completedModules,
}: {
  progress: number;
  totalModules: number;
  completedModules: number;
}) => {
  const progressBarRef = useRef(null);
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
          className={`custom-progress-fill ${
            isAnimating ? "pulse-animation" : ""
          }`}
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
};

function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const continueLastModule = () => {
    navigate("/module/state");
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header-skeleton">
          <Skeleton.Input active style={{ width: "100%", height: 40 }} />
          <Skeleton.Button active style={{ width: "100%", maxWidth: 150 }} />
        </div>
        <div className="dashboard-content-skeleton">
          <div className="dashboard-row">
            <Skeleton.Input active style={{ width: "100%", height: 200 }} />
          </div>
          <div className="dashboard-row">
            <Skeleton.Input active style={{ width: "100%", height: 300 }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Welcome back, Developer!</h1>
          <p className="dashboard-subtitle">
            Continue your learning journey and track your progress
          </p>
        </div>
      </div>

      <div className="dashboard-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="dashboard-continue-learning"
        >
          <div className="continue-learning-content">
            <h2>Continue where you left off</h2>
            <h3>State Management in React</h3>
            <p>
              Master modern state management techniques in React applications,
              from local state to global solutions.
            </p>
            <div className="continue-learning-progress">
              <Tooltip
                title={`${mockCourseProgress[0].completedModules} of ${mockCourseProgress[0].totalModules} modules completed`}
                placement="top"
              >
                <CustomProgressBar
                  progress={mockCourseProgress[0].progress}
                  totalModules={mockCourseProgress[0].totalModules}
                  completedModules={mockCourseProgress[0].completedModules}
                />
              </Tooltip>
            </div>
            <Button
              type="primary"
              size="large"
              onClick={continueLastModule}
              className="continue-button"
            >
              Continue Learning
            </Button>
          </div>
        </motion.div>

        <div className="dashboard-stats">
          {mockStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="dashboard-stat-card"
            >
              <div
                className="stat-icon"
                style={{
                  backgroundColor: `${stat.color}15`,
                  color: stat.color,
                }}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="dashboard-roadmaps"
        >
          <div className="dashboard-card-header">
            <h2>Learning Roadmaps</h2>
          </div>
          <div className="roadmaps-grid">
            {mockRoadmaps.map((roadmap, index) => (
              <motion.div
                key={roadmap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="roadmap-card"
                onClick={() => navigate(`/learning-path`)}
              >
                <div className="roadmap-content">
                  <h3>{roadmap.name}</h3>
                  <p>{roadmap.description}</p>
                  <div className="roadmap-meta">
                    <span className="roadmap-modules">
                      <BookOpen className="w-4 h-4" />
                      {roadmap.modules} Modules
                    </span>
                    <span className="roadmap-time">
                      <Clock className="w-4 h-4" />
                      {roadmap.estimatedTime}
                    </span>
                  </div>
                  <div className="roadmap-level">
                    <span>{roadmap.level}</span>
                  </div>
                </div>
                <div className="roadmap-action">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
