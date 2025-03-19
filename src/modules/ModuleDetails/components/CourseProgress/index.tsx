import { Typography, Row, Col } from "antd";
import { BookOutlined, StarOutlined } from "@ant-design/icons";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import styles from "./CourseProgress.module.scss";

const { Title, Text } = Typography;

interface CourseProgressProps {
  title: string;
  progress: number;
  totalConcepts: number;
  difficulty: string;
}

function CourseProgress({
  title,
  progress,
  totalConcepts,
  difficulty,
}: CourseProgressProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: `${progress}%`,
      transition: { duration: 1.5, ease: "easeOut" },
    });
  }, [progress, controls]);

  return (
    <div className={styles.courseProgressContainer}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <div className={styles.mainSection}>
            <Title level={4} className={styles.courseTitle}>
              {title}
            </Title>

            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <Text className={styles.progressLabel}>Progress</Text>
                <motion.div
                  className={styles.progressValue}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {progress}%
                </motion.div>
              </div>

              <div className={styles.progressContentWrapper}>
                <div className={styles.progressBarWrapper}>
                  <div className={styles.progressTrack}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ width: "0%" }}
                      animate={controls}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <div className={styles.detailsSection}>
            <Title level={4} className={styles.detailsTitle}>
              Course Details
            </Title>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <StarOutlined />
                </div>
                <div className={styles.detailContent}>
                  <Text type="secondary" className={styles.itemLabel}>
                    Difficulty
                  </Text>
                  <div className={styles.itemValue}>{difficulty}</div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <BookOutlined />
                </div>
                <div className={styles.detailContent}>
                  <Text type="secondary" className={styles.itemLabel}>
                    Concepts
                  </Text>
                  <div className={styles.itemValue}>
                    {totalConcepts} concepts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CourseProgress;
