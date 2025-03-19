import { useState } from "react";
import { Typography, Row, Col, Tabs, Button } from "antd";
import {
  CheckCircleOutlined,
  RightOutlined,
  BookOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import Quiz from "../Quiz";
import styles from "./CourseConcept.module.scss";
import { Chapter } from "@src/modules/LearningPath/data/pathTypes";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function CourseConcept({
  id: chapterId,
  name,
  articles,
  description,
  isCompleted,
  quiz,
}: Chapter) {
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("articles");

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const renderHeader = () => (
    <div className={styles.conceptHeader} onClick={toggleExpand}>
      <Row className={styles.conceptContent}>
        <Col className={styles.iconCol}>
          {isCompleted && <CheckCircleOutlined className={styles.statusIcon} />}

          {!isCompleted && (
            <div className={styles.activeIcon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="7" fill="#4F7BF2" />
                <circle cx="8" cy="8" r="3" fill="white" />
              </svg>
            </div>
          )}
        </Col>
        <Col flex="1" className={styles.contentCol}>
          <div>
            <Title level={5} className={styles.conceptTitle}>
              {name}
            </Title>
            {isCompleted && (
              <Text className={styles.statusText}>Completed</Text>
            )}
            {!isCompleted && (
              <Text className={styles.statusText}>In Progress</Text>
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
    if (!expanded) return null;

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
              {articles.length > 0 ? (
                <div className={styles.readingList}>
                  {articles.map((article) => (
                    <div key={article.url} className={styles.readingItem}>
                      <BookOutlined className={styles.readingIcon} />
                      <div className={styles.readingContent}>
                        <h4 className={styles.readingTitle}>{article.name}</h4>
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
            <Quiz chapterId={chapterId} quiz={quiz} />
          </TabPane>
        </Tabs>
      </div>
    );
  };

  return (
    <div
      className={`${styles.conceptCard} ${
        styles[isCompleted ? "completed" : "inCompleted"]
      }`}
    >
      {renderHeader()}
      {renderExpandedContent()}
    </div>
  );
}

export default CourseConcept;
