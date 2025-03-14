"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { Button, Input } from "antd"
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, Lightbulb, LinkIcon, BookOpen, Play, Video,
    Send } from "lucide-react"
import AnimatedStar from "../../shared/components/Star/animated-star"
import "../module-detail.scss"

const { TextArea } = Input

interface ModuleDetailProps {
  moduleId?: string
  moduleTitle?: string
}

// Define RootState interface
interface RootState {
  learning: {
    sections: any[] // Replace 'any' with the actual type of your sections
    resources: any[] // Replace 'any' with the actual type of your resources
    progress: number
  }
}

// Mock moduleData
const moduleData = {
  practiceExercises: [
    {
      title: "Exercise 1",
      description: "Solve the state management problem.",
      difficulty: "Beginner",
      xp: 50,
      status: "Incomplete",
    },
    {
      title: "Exercise 2",
      description: "Implement a complex state update.",
      difficulty: "Intermediate",
      xp: 75,
      status: "Incomplete",
    },
  ],
  video: {
    title: "Understanding React State Management",
    embedUrl: "https://www.youtube.com/embed/4ORZ1GmjaMc",
    summary:
      "This video covers the fundamentals of state management in React applications. We explore the differences between local component state and global state solutions, when to use each approach, and best practices for managing complex state. The video also demonstrates practical examples of implementing state management in real-world applications.",
    questions: [
      {
        id: 1,
        question: "What's the difference between useState and useReducer?",
        answer:
          "useState is simpler and good for managing independent pieces of state, while useReducer is better for complex state logic that involves multiple sub-values or when the next state depends on the previous one.",
      },
      {
        id: 2,
        question: "When should I use Redux instead of Context API?",
        answer:
          "Redux is more suitable for large applications with complex state interactions, frequent updates, and when you need features like middleware, time-travel debugging, or a more structured approach to state management. Context API is simpler and sufficient for less complex state sharing needs.",
      },
    ],
  },
}

// Maximum number of questions a user can ask per video
const MAX_QUESTIONS = 5

export default function ModuleDetail({
  moduleId = "state",
  moduleTitle = "State Management in React",
}: ModuleDetailProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("video") // Changed default to video
  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState("")
  const [questions, setQuestions] = useState(moduleData.video.questions)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userQuestionCount, setUserQuestionCount] = useState(0)

  // Get state from Redux store
  const { sections, resources, progress } = useSelector((state: RootState) => state.learning)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleSectionComplete = (sectionId: string) => {
    // Dispatch the actual Redux action
    dispatch(toggleSectionComplete(sectionId))
    message.success("Section status updated")
  }

  const handleResourceComplete = (resourceId: string) => {
    // Dispatch the actual Redux action
    dispatch(toggleResourceComplete(resourceId))
    message.success("Resource status updated")
  }

  const handleQuestionSubmit = () => {
    if (!question.trim()) return

    if (userQuestionCount >= MAX_QUESTIONS) {
      message.warning(`You've reached the limit of ${MAX_QUESTIONS} questions for this video`)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newQuestion = {
        id: questions.length + 1,
        question,
        answer:
          "Thank you for your question! Our AI is analyzing the video content and will provide an answer shortly.",
      }

      setQuestions([...questions, newQuestion])
      setQuestion("")
      setIsSubmitting(false)
      setUserQuestionCount((prev) => prev + 1)
    }, 1000)
  }

  const remainingQuestions = MAX_QUESTIONS - userQuestionCount

  if (isLoading) {
    return (
      <div className="module-detail-container">
        <div className="module-detail-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-stats"></div>
          <div className="skeleton-content"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="module-detail-container">
      <div className="module-detail-header">
        <Button
          type="default"
          onClick={() => navigate("/learning-path")}
          icon={<ArrowLeft className="h-4 w-4 mr-2" />}
          className="module-detail-back-button"
        >
          Back to Learning Path
        </Button>

        <div className="module-detail-actions">
          <span className="module-detail-header-badge">Coming Soon</span>
          <Button type="primary" className="module-detail-quiz-button" onClick={() => navigate(`/quiz/${moduleId}`)}>
            Take Quiz
          </Button>
        </div>
      </div>

      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="module-detail-header-title">
        {moduleTitle}
      </motion.h1>

      <div className="module-detail-stats">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="module-detail-stats-card"
        >
          <h3 className="module-detail-stats-card-title">Module Progress</h3>
          <div className="module-detail-stats-card-value">
            <div className="icon-orange">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: progress > 0 ? 360 : 0 }}
                transition={{ duration: 1 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M12 5v7l4.28 2.54.72-1.21-3.5-2.08V5H12z" />
                </svg>
              </motion.div>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="module-detail-stats-card-value-text"
            >
              {progress}%
            </motion.span>
          </div>
          <div className="module-detail-progress-bar">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="module-detail-progress-bar-fill"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="module-detail-stats-card"
        >
          <h3 className="module-detail-stats-card-title">Estimated Time</h3>
          <div className="module-detail-stats-card-value">
            <Clock className="icon-blue w-6 h-6" />
            <span className="module-detail-stats-card-value-text">2.5 hours</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="module-detail-stats-card"
        >
          <h3 className="module-detail-stats-card-title">Difficulty</h3>
          <div className="module-detail-stats-card-value">
            <AnimatedStar className="icon-yellow w-6 h-6" />
            <span className="module-detail-stats-card-value-text">Intermediate</span>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="module-detail-description"
      >
        Master modern state management techniques in React applications, from local state to global solutions.
      </motion.p>

      <div className="module-detail-tabs">
        {[
          { id: "video", icon: Video, label: "Video Lesson" },
          { id: "learning-journey", icon: Play, label: "Learning Journey" },
          { id: "tips", icon: Lightbulb, label: "Tips & Best Practices" },
          { id: "donts", icon: AlertTriangle, label: "Don'ts & Why" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`module-detail-tabs-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "video" && (
            <div className="module-detail-video">
              <div className="video-embed-container">
                <iframe
                  src={moduleData.video.embedUrl}
                  title={moduleData.video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-embed"
                ></iframe>
              </div>

              <div className="module-detail-video-summary">
                <h3 className="module-detail-section-title">Video Summary</h3>
                <p>{moduleData.video.summary}</p>
              </div>

              <div className="module-detail-video-questions">
                <h3 className="module-detail-section-title">
                  Ask a Question
                  <span className="questions-remaining">
                    {remainingQuestions} of {MAX_QUESTIONS} questions remaining
                  </span>
                </h3>

                <div className="question-input-container">
                  <TextArea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={
                      remainingQuestions > 0
                        ? "Ask a question about this video..."
                        : "You've reached the maximum number of questions for this video"
                    }
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    className="question-input"
                    disabled={remainingQuestions <= 0}
                  />
                  <Button
                    type="primary"
                    icon={<Send className="h-4 w-4" />}
                    onClick={handleQuestionSubmit}
                    loading={isSubmitting}
                    disabled={!question.trim() || isSubmitting || remainingQuestions <= 0}
                    className="question-submit-button"
                  >
                    Submit
                  </Button>
                </div>

                <div className="questions-list">
                  {questions.map((q) => (
                    <div key={q.id} className="question-item">
                      <div className="question">
                        <div className="question-header">
                          <span className="question-label">Q:</span>
                          <p>{q.question}</p>
                        </div>
                      </div>
                      <div className="answer">
                        <div className="answer-header">
                          <span className="answer-label">A:</span>
                          <p>{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "learning-journey" && (
            <div className="module-detail-content">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="module-detail-content-section"
                >
                  {section.completed && <div className="module-detail-content-section-badge">Completed</div>}
                  <div className="module-detail-content-section-header">
                    <button onClick={() => handleSectionComplete(section.id)} className="completion-button">
                      <div className={`circle-indicator ${section.completed ? "completed" : ""}`}>
                        {section.completed && <CheckCircle className="check-icon" />}
                      </div>
                    </button>
                    <div>
                      <h3 className="module-detail-content-section-title">{section.title}</h3>
                      <p className="module-detail-content-section-text">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="module-detail-resources">
                <h3 className="module-detail-section-title">
                  <BookOpen className="w-5 h-5" />
                  Related Resources
                </h3>
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="module-detail-resource-item"
                  >
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-content">
                      <LinkIcon className="w-4 h-4" />
                      <div>
                        <h4>{resource.title}</h4>
                        <span className="resource-type">{resource.type}</span>
                      </div>
                    </a>
                    <button
                      onClick={() => handleResourceComplete(resource.id)}
                      className={`resource-complete-button ${resource.completed ? "completed" : ""}`}
                    >
                      {resource.completed ? (
                        <span className="resource-completed">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </span>
                      ) : (
                        "Mark as Complete"
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="module-detail-exercises">
                <h3 className="module-detail-section-title">
                  <Play className="w-5 h-5" />
                  Practice Exercises
                </h3>
                {moduleData.practiceExercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="module-detail-exercise-item"
                  >
                    <div className="exercise-content">
                      <h4>{exercise.title}</h4>
                      <p>{exercise.description}</p>
                      <div className="exercise-meta">
                        <span className={`difficulty ${exercise.difficulty.toLowerCase()}`}>{exercise.difficulty}</span>
                        <span className="xp">{exercise.xp} XP</span>
                      </div>
                    </div>
                    <span className="exercise-status">{exercise.status}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tips" && (
            <div className="module-detail-tips">
              {[
                "Start with React's built-in state management",
                "Use Redux DevTools for debugging state changes",
                "Consider using Redux Toolkit to reduce boilerplate code",
                "Implement proper state immutability patterns",
                "Structure your store with proper normalization",
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="module-detail-tip-item"
                >
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <div>
                    <h4>Tip #{index + 1}</h4>
                    <p>{tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "donts" && (
            <div className="module-detail-donts">
              {[
                {
                  dont: "Using Redux for everything",
                  do: "Choose state management based on needs",
                  why: "Not every piece of state needs to be in Redux. Local state is perfect for component-specific data, while Redux should be reserved for truly global state that many components need to access.",
                },
                {
                  dont: "Mutating state directly",
                  do: "Create new state objects immutably",
                  why: "Direct state mutations can lead to bugs and make it harder to track changes. Always create new objects when updating state to maintain predictability and enable features like time-travel debugging.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="module-detail-dont-item"
                >
                  <div className="dont-section">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <h4>Don&apos;t Do This</h4>
                    <p>{item.dont}</p>
                  </div>
                  <div className="do-section">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h4>Do This Instead</h4>
                    <p>{item.do}</p>
                  </div>
                  <div className="why-section">
                    <h4>Why?</h4>
                    <p>{item.why}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}