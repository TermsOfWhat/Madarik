'use client';

import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Tooltip, Alert, Skeleton } from 'antd';
import { CustomProgressBar } from './components/CustomProgressBar';
import { useMounted } from '../shared/hooks/use-mounted';
import { StatCard } from './components/StatCard';
import { RoadmapCard } from './components/RoadmapCard';
import { useAppDispatch, useAppSelector } from '../shared/store';
import { useEffect, useRef, useState } from 'react';
import { fetchAnalytics } from './data/analyticsThunk';
import {
  BookMarked,
  Flame,
  PlayCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import './dashboard.scss';
import { fetchRoadmaps } from './data/roadmapsThunk';
import { CourseCompletionCard } from './components/CourseCompletionCard';
import { PATH as ROADMAPS_PATH } from '@src/modules/roadmaps/routes/paths';

function DashboardSkeleton() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header-skeleton">
        <Skeleton.Input active style={{ width: 300, height: 40 }} />
        <Skeleton.Input
          active
          style={{ width: 450, height: 24, marginTop: 8 }}
        />
      </div>

      <div className="dashboard-content-skeleton" style={{ marginTop: 24 }}>
        <div
          className="dashboard-row"
          style={{
            background: '#f8fafc',
            padding: 32,
            borderRadius: 12,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Skeleton.Input
            active
            style={{ width: 200, height: 24, marginBottom: 16 }}
          />
          <Skeleton.Input
            active
            style={{ width: 300, height: 32, marginBottom: 16 }}
          />
          <Skeleton.Input
            active
            style={{ width: '80%', height: 80, marginBottom: 24 }}
          />{' '}
          <Skeleton.Input
            active
            style={{ width: '100%', height: 16, marginBottom: 24 }}
          />{' '}
          <Skeleton.Button active style={{ width: 150, height: 40 }} />
        </div>

        <div
          className="dashboard-row"
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 24,
            flexWrap: 'wrap',
          }}
        >
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              style={{
                flex: '1 1 calc(33.333% - 16px)',
                minWidth: 200,
                background: 'white',
                padding: 16,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <Skeleton.Avatar
                active
                size={48}
                shape="square"
                style={{ borderRadius: 8 }}
              />
              <div>
                <Skeleton.Input
                  active
                  style={{ width: 80, height: 28, marginBottom: 8 }}
                />
                <Skeleton.Input active style={{ width: 120, height: 16 }} />
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-row" style={{ marginTop: 24 }}>
          <Skeleton.Input
            active
            style={{ width: 200, height: 24, marginBottom: 16 }}
          />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                style={{
                  flex: '1 1 calc(50% - 8px)',
                  minWidth: 300,
                  display: 'flex',
                  background: '#f9fafb',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <div style={{ flex: 1, padding: 16 }}>
                  <Skeleton.Input
                    active
                    style={{ width: '60%', height: 24, marginBottom: 8 }}
                  />
                  <Skeleton.Input
                    active
                    style={{ width: '90%', height: 40, marginBottom: 8 }}
                  />
                  <div style={{ display: 'flex', gap: 16 }}>
                    <Skeleton.Input active style={{ width: 80, height: 16 }} />
                    <Skeleton.Input active style={{ width: 80, height: 16 }} />
                  </div>
                </div>
                <Skeleton.Input active style={{ width: 48, height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { isMounted } = useMounted();
  const dispatch = useAppDispatch();
  const [showAllRoadmaps, setShowAllRoadmaps] = useState(false);

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
    error: analyticsError,
  } = useAppSelector((state) => state.analytics);
  const {
    data: roadmapsData,
    isLoading: roadmapsLoading,
    error: roadmapsError,
  } = useAppSelector((state) => state.roadmaps);

  const headerRef = useRef(null);
  const continueLearningRef = useRef(null);
  const statsRef = useRef(null);
  const roadmapsRef = useRef(null);

  useEffect(() => {
    Promise.all([dispatch(fetchAnalytics()), dispatch(fetchRoadmaps())]);
  }, [dispatch]);

  if (!isMounted || analyticsLoading || roadmapsLoading) {
    return <DashboardSkeleton />;
  }

  if (analyticsError || roadmapsError) {
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

  if (!analyticsData || !roadmapsData) {
    return null;
  }

  const currentCourse = {
    id: analyticsData.topic.id,
    name: analyticsData.topic.name,
    roadmapId: analyticsData.topic.roadmapId,
    description: analyticsData.topic.description,
    progress: analyticsData.topic.progress,
    totalModules: 100,
    completedModules: analyticsData.topic.progress,
    lastAccessedAt: new Date().toISOString(),
  };

  const stats = [
    {
      label: 'Learning Streak',
      value: `${analyticsData.streak} days`,
      icon: Flame,
      color: '#f97316',
    },
    {
      label: 'Modules Completed',
      value: analyticsData.completedModules.toString(),
      icon: BookMarked,
      color: '#3b82f6',
    },
    {
      label: 'Quizzes Taken',
      value: analyticsData.quizesTaken.toString(),
      icon: PlayCircle,
      color: '#8b5cf6',
    },
  ];

  const roadmaps = roadmapsData.map((roadmap) => ({
    id: roadmap.id,
    name: roadmap.name,
    description: roadmap.description,
    modules: roadmap.numberOfTopics,
    estimatedTime: roadmap.estimatedTime,
    difficulty: roadmap.difficutly,
  }));

  const isCourseCompleted = currentCourse.progress === 100;
  const displayedRoadmaps = showAllRoadmaps ? roadmaps : roadmaps.slice(0, 4);
  const hasMoreRoadmaps = roadmaps.length > 4;

  const toggleRoadmapsView = () => {
    navigate(ROADMAPS_PATH.ROADMAPS);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" ref={headerRef}>
        <div className="dashboard-title">
          <h1>Welcome back, Developer!</h1>
          <p className="dashboard-subtitle">
            Continue your learning journey and track your progress
          </p>
        </div>
      </div>

      <div className="dashboard-content">
        <AnimatePresence>
          {isCourseCompleted ? (
            <CourseCompletionCard
              courseName={currentCourse.name}
              courseDescription={currentCourse.description}
              onViewCertificate={() =>
                navigate(`/certificate/${currentCourse.id}`)
              }
              onNextCourse={() => {
                if (roadmaps.length > 0) {
                  navigate(
                    `/roadmap/${currentCourse.roadmapId}/module/${currentCourse.id}`,
                  );
                }
              }}
            />
          ) : (
            <motion.div
              ref={continueLearningRef}
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
                    title={`${currentCourse.completedModules}% completed`}
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
                  onClick={() =>
                    navigate(
                      `/roadmap/${currentCourse.roadmapId}/module/${currentCourse.id}`,
                    )
                  }
                  className="continue-button"
                >
                  Continue Learning
                </Button>
              </div>
            </motion.div>
          )}

          <div className="dashboard-stats" ref={statsRef}>
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} index={index} />
            ))}
          </div>

          <motion.div
            ref={roadmapsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="dashboard-roadmaps"
          >
            <div className="dashboard-card-header">
              <h2>Learning Roadmaps</h2>
              <Button
                type="link"
                onClick={toggleRoadmapsView}
                className="roadmap-toggle-button"
              >
                View All
              </Button>
            </div>

            <AnimatePresence initial={false}>
              <motion.div
                className="roadmaps-grid"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 1 },
                  animate: { opacity: 1 },
                  exit: { opacity: 1 },
                }}
              >
                {displayedRoadmaps.map((roadmap, index) => (
                  <motion.div
                    key={`roadmap-${roadmap.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: index < 4 ? 0 : 0.05 * (index - 3),
                    }}
                  >
                    <RoadmapCard
                      roadmap={roadmap}
                      index={index}
                      onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
