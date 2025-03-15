"use client";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Skeleton, Tooltip, Alert } from "antd";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { CustomProgressBar } from "./components/CustomProgressBar";
import { useDashboardData } from "./hooks/use-dashboard-data";
import { useMounted } from "../shared/hooks/use-mounted";
import { StatCard } from "./components/StatCard";
import { RoadmapCard } from "./components/RoadmapCard";
import "./dashboard.scss";

function DashboardSkeleton() {
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

export default function Dashboard() {
  const navigate = useNavigate();
  const { isMounted } = useMounted();
  const { data, isLoading, error } = useDashboardData();

  if (!isMounted || isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <Alert
          message="Error"
          description="Failed to load dashboard data. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { currentCourse, stats, roadmaps } = data;

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
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="dashboard-continue-learning"
          >
            <div className="continue-learning-content">
              <h2>Continue where you left off</h2>
              <h3>{currentCourse.name}</h3>
              <p>{currentCourse.description}</p>
              <div className="continue-learning-progress">
                <Tooltip
                  title={`${currentCourse.completedModules} of ${currentCourse.totalModules} modules completed`}
                  placement="top"
                >
                  <CustomProgressBar
                    progress={currentCourse.progress}
                    totalModules={currentCourse.totalModules}
                    completedModules={currentCourse.completedModules}
                  />
                </Tooltip>
              </div>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate(`/module/${currentCourse.id}`)}
                className="continue-button"
              >
                Continue Learning
              </Button>
            </div>
          </motion.div>

          <div className="dashboard-stats">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} index={index} />
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
              {roadmaps.map((roadmap, index) => (
                <RoadmapCard
                  key={roadmap.id}
                  roadmap={roadmap}
                  index={index}
                  onClick={() => navigate(`/learning-path/${roadmap.id}`)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
