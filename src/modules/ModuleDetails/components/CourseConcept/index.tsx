"use client";

import { useState } from "react";
import { Typography, Row, Col, Tabs, Button, Space, message } from "antd";
import {
  CheckCircleOutlined,
  RightOutlined,
  LockOutlined,
  BookOutlined,
  ExportOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Quiz, { QuizQuestion } from "../Quiz";
import styles from "./CourseConcept.module.scss";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export type ConceptStatus = "completed" | "active" | "locked";

interface RecommendedReading {
  id: number;
  title: string;
  author: string;
  readTime: number;
  url: string;
}

interface CourseConceptProps {
  title: string;
  description: string;
  status: ConceptStatus;
  onClick?: () => void;
  recommendedReadings?: RecommendedReading[];
}

function CourseConcept({
  title,
  description,
  status,
  onClick,
  recommendedReadings = [],
}: CourseConceptProps) {
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("articles");

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== "locked") {
      setExpanded(!expanded);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== "locked" && onClick) {
      onClick();
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  // Updated quiz questions to match the reference image
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "When should you use local state instead of global state?",
      options: [
        "Always use global state for simplicity",
        "When the state is only needed by a single component",
        "When the state needs to be shared across the entire application",
        "Local state should never be used",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question:
        "Which of the following is NOT a global state management solution?",
      options: ["Redux", "useContext", "useState", "MobX"],
      correctAnswer: 2,
    },
  ];

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    message.success(`You scored ${score} out of ${totalQuestions}!`);
  };

  const renderHeader = () => (
    <div className={styles.conceptHeader} onClick={toggleExpand}>
      <Row className={styles.conceptContent}>
        <Col className={styles.iconCol}>
          {status === "completed" && (
            <CheckCircleOutlined className={styles.statusIcon} />
          )}
          {status === "locked" && (
            <LockOutlined className={styles.statusIcon} />
          )}
          {status === "active" && <div className={styles.emptyIcon} />}
        </Col>
        <Col flex="1" className={styles.contentCol}>
          <div>
            <Title level={5} className={styles.conceptTitle}>
              {title}
            </Title>
            {status === "completed" && (
              <Text className={styles.statusText}>Completed</Text>
            )}
            {status === "locked" && (
              <Text className={styles.statusText}>Locked</Text>
            )}
            <Text className={styles.conceptDescription}>{description}</Text>
          </div>
        </Col>
        <Col className={styles.arrowCol}>
          <RightOutlined
            className={`${styles.arrowIcon} ${expanded ? styles.expanded : ""}`}
          />
        </Col>
      </Row>
    </div>
  );

  const renderExpandedContent = () => {
    if (!expanded || status === "locked") return null;

    return (
      <div className={styles.expandedContent}>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          className={styles.conceptTabs}
        >
          <TabPane tab="Articles" key="articles">
            <div className={styles.articlesSection}>
              <h3 className={styles.sectionTitle}>Recommended Reading</h3>
              {recommendedReadings.length > 0 ? (
                <div className={styles.readingList}>
                  {recommendedReadings.map((article) => (
                    <div key={article.id} className={styles.readingItem}>
                      <BookOutlined className={styles.readingIcon} />
                      <div className={styles.readingContent}>
                        <h4 className={styles.readingTitle}>{article.title}</h4>
                        <div className={styles.readingMeta}>
                          <Text type="secondary">{article.author}</Text>
                          <div className={styles.readingTime}>
                            <ClockCircleOutlined /> {article.readTime} min
                          </div>
                        </div>
                        <Button
                          type="link"
                          className={styles.readButton}
                          icon={<ExportOutlined />}
                          href={article.url}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Read Article
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Text type="secondary">No recommended readings available.</Text>
              )}
            </div>
          </TabPane>

          <TabPane tab="Quiz" key="quiz">
            <Quiz questions={quizQuestions} onComplete={handleQuizComplete} />
          </TabPane>
        </Tabs>
      </div>
    );
  };

  return (
    <div className={`${styles.conceptCard} ${styles[status]}`}>
      {renderHeader()}
      {renderExpandedContent()}
    </div>
  );
}

export default CourseConcept;
