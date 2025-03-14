"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Button, Progress, Tabs, Skeleton } from "antd"
import {
  PlayCircle,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  BarChart2,
  Star,
  Activity,
  Zap,
  ChevronRight,
  BookMarked,
  Flame,
} from "lucide-react"
import "./dashboard.scss"

const mockCourseProgress = [
  {
    id: "react",
    name: "React Fundamentals",
    progress: 65,
    totalModules: 8,
    completedModules: 5,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
  },
  {
    id: "nextjs",
    name: "Next.js Mastery",
    progress: 30,
    totalModules: 10,
    completedModules: 3,
    image: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
  },
  {
    id: "typescript",
    name: "TypeScript Deep Dive",
    progress: 10,
    totalModules: 12,
    completedModules: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
  },
]

const mockRecentActivity = [
  { id: 1, type: "module", name: "State Management in React", date: "2 hours ago", icon: BookOpen },
  { id: 2, type: "quiz", name: "React Hooks Quiz", date: "Yesterday", icon: PlayCircle, score: 85 },
  { id: 3, type: "achievement", name: "Fast Learner", date: "2 days ago", icon: Award },
  { id: 4, type: "module", name: "Next.js Routing", date: "3 days ago", icon: BookOpen },
]

const mockRecommendations = [
  {
    id: "redux",
    name: "Redux for State Management",
    description: "Learn how to manage complex state with Redux",
    level: "Intermediate",
    duration: "3 hours",
    tags: ["React", "State Management"],
  },
  {
    id: "testing",
    name: "Testing React Applications",
    description: "Master Jest and React Testing Library",
    level: "Advanced",
    duration: "4 hours",
    tags: ["Testing", "Jest", "RTL"],
  },
  {
    id: "performance",
    name: "React Performance Optimization",
    description: "Techniques to make your React apps blazing fast",
    level: "Advanced",
    duration: "2.5 hours",
    tags: ["Performance", "Optimization"],
  },
]

const mockAchievements = [
  { id: 1, name: "First Module Completed", icon: CheckCircle, date: "2 weeks ago", unlocked: true },
  { id: 2, name: "Quiz Master", icon: Award, date: "1 week ago", unlocked: true },
  { id: 3, name: "Consistent Learner", icon: Calendar, date: null, unlocked: false, progress: 70 },
  { id: 4, name: "Full Stack Developer", icon: BarChart2, date: null, unlocked: false, progress: 30 },
]

const mockStats = [
  { label: "Learning Streak", value: "7 days", icon: Flame, color: "#f97316" },
  { label: "Modules Completed", value: "9", icon: BookMarked, color: "#3b82f6" },
  { label: "Quizzes Taken", value: "5", icon: PlayCircle, color: "#8b5cf6" },
  { label: "Total XP", value: "1,250", icon: Zap, color: "#eab308" },
]

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const continueLastModule = () => {
    navigate("/module/state")
  }

  const viewLearningPath = () => {
    navigate("/learning-path")
  }

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header-skeleton">
          <Skeleton.Input active style={{ width: 300, height: 40 }} />
          <Skeleton.Button active style={{ width: 150 }} />
        </div>
        <div className="dashboard-content-skeleton">
          <div className="dashboard-row">
            <Skeleton.Input active style={{ width: "100%", height: 200 }} />
          </div>
          <div className="dashboard-row">
            <Skeleton.Input active style={{ width: "48%", height: 300 }} />
            <Skeleton.Input active style={{ width: "48%", height: 300 }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Welcome back, Daly!</h1>
          <p className="dashboard-subtitle">Continue your learning journey and track your progress</p>
        </div>
        <div className="dashboard-actions">
          <Button
            type="default"
            size="large"
            icon={<TrendingUp className="w-5 h-5" />}
            onClick={viewLearningPath}
            className="dashboard-action-button"
          >
            View Learning Path
          </Button>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="dashboard-tabs"
        items={[
          {
            key: "overview",
            label: (
              <span className="dashboard-tab">
                <Activity className="w-4 h-4" />
                Overview
              </span>
            ),
            children: (
              <div className="dashboard-content">
                {/* Continue Learning Section */}
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
                      Master modern state management techniques in React applications, from local state to global
                      solutions.
                    </p>
                    <div className="continue-learning-progress">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${mockCourseProgress[0].progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="progress-bar-fill"
                      >
                        <Progress
                          percent={mockCourseProgress[0].progress}
                          strokeColor="#3b82f6"
                          format={(percent) => `${percent}%`}
                        />
                      </motion.div>
                    </div>
                    <Button type="primary" size="large" onClick={continueLastModule} className="continue-button">
                      Continue Learning
                    </Button>
                  </div>
                  <div className="continue-learning-image">
                    <img
                      src={mockCourseProgress[0].image || "/placeholder.svg"}
                      alt="React Fundamentals"
                      className="module-image"
                    />
                  </div>
                </motion.div>

                {/* Stats Row */}
                <div className="dashboard-stats">
                  {mockStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="dashboard-stat-card"
                    >
                      <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="stat-content">
                        <h3 className="stat-value">{stat.value}</h3>
                        <p className="stat-label">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Two Column Layout */}
                <div className="dashboard-two-columns">
                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="dashboard-recent-activity"
                  >
                    <div className="dashboard-card-header">
                      <h2>Recent Activity</h2>
                      <Button type="link">View All</Button>
                    </div>
                    <div className="activity-list">
                      {mockRecentActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                          className="activity-item"
                        >
                          <div
                            className={`activity-icon ${
                              activity.type === "achievement"
                                ? "achievement"
                                : activity.type === "quiz"
                                  ? "quiz"
                                  : "module"
                            }`}
                          >
                            <activity.icon className="w-5 h-5" />
                          </div>
                          <div className="activity-content">
                            <h3>{activity.name}</h3>
                            <div className="activity-meta">
                              <span className="activity-type">{activity.type}</span>
                              <span className="activity-date">{activity.date}</span>
                              {activity.score && <span className="activity-score">{activity.score}%</span>}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

        
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="dashboard-achievements"
                  >
                    <div className="dashboard-card-header">
                      <h2>Achievements</h2>
                      <Button type="link">View All</Button>
                    </div>
                    <div className="achievements-grid">
                      {mockAchievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                          className={`achievement-item ${achievement.unlocked ? "unlocked" : "locked"}`}
                        >
                          <div className="achievement-icon">
                            <achievement.icon className="w-6 h-6" />
                            {!achievement.unlocked && achievement.progress && (
                              <Progress
                                type="circle"
                                percent={achievement.progress}
                                width={44}
                                strokeWidth={6}
                                className="achievement-progress"
                              />
                            )}
                          </div>
                          <div className="achievement-content">
                            <h3>{achievement.name}</h3>
                            {achievement.unlocked ? (
                              <span className="achievement-date">Unlocked {achievement.date}</span>
                            ) : (
                              <span className="achievement-progress-text">{achievement.progress}% complete</span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="dashboard-recommendations"
                >
                  <div className="dashboard-card-header">
                    <h2>Recommended for You</h2>
                    <Button type="link">View All</Button>
                  </div>
                  <div className="recommendations-grid">
                    {mockRecommendations.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="recommendation-card"
                        onClick={() => navigate(`/module/${course.id}`)}
                      >
                        <div className="recommendation-content">
                          <h3>{course.name}</h3>
                          <p>{course.description}</p>
                          <div className="recommendation-meta">
                            <span className="recommendation-level">
                              <Star className="w-4 h-4" />
                              {course.level}
                            </span>
                            <span className="recommendation-duration">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </span>
                          </div>
                          <div className="recommendation-tags">
                            {course.tags.map((tag) => (
                              <span key={tag} className="recommendation-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="recommendation-action">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ),
          },
          {
            key: "courses",
            label: (
              <span className="dashboard-tab">
                <BookOpen className="w-4 h-4" />
                My Courses
              </span>
            ),
            children: (
              <div className="dashboard-courses">
                <div className="dashboard-card-header">
                  <h2>Your Enrolled Courses</h2>
                  <Button type="primary" icon={<BookOpen className="w-4 h-4" />}>
                    Browse Courses
                  </Button>
                </div>
                <div className="courses-list">
                  {mockCourseProgress.map((course) => (
                    <div key={course.id} className="course-card">
                      <div className="course-info">
                        <h3>{course.name}</h3>
                        <div className="course-progress">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="progress-bar-container"
                          >
                            <Progress
                              percent={course.progress}
                              strokeColor="#3b82f6"
                              format={(percent) => `${percent}%`}
                            />
                          </motion.div>
                          <div className="course-progress-text">
                            <span>
                              {course.completedModules} of {course.totalModules} modules completed
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="course-actions">
                        <Button
                          type="primary"
                          onClick={() => navigate(`/module/${course.id}`)}
                          className="continue-course-button"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            key: "achievements",
            label: (
              <span className="dashboard-tab">
                <Award className="w-4 h-4" />
                Achievements
              </span>
            ),
            children: <div>Achievements Content</div>,
          },
          {
            key: "analytics",
            label: (
              <span className="dashboard-tab">
                <BarChart2 className="w-4 h-4" />
                Analytics
              </span>
            ),
            children: <div>Analytics Content</div>,
          },
        ]}
      />
    </div>
  )
}

export default Dashboard

