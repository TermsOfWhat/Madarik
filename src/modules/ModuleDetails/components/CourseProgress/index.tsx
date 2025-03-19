import { Typography, Row, Col } from 'antd';
import { BookOutlined, StarOutlined } from '@ant-design/icons';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import styles from './CourseProgress.module.scss';

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
      transition: { duration: 1.5, ease: 'easeOut' },
    });
  }, [progress, controls]);

  const displayProgress = progress > 75 ? 100 : Math.min(progress, 75);

  return (
    <div className={styles.courseProgressContainer}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <div className={styles.mainSection}>
            <Title level={5} className={styles.courseTitle}>
              {title}
            </Title>

            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <Text className={styles.progressLabel}>Course Progress</Text>
                <Text className={styles.progressValue}>
                  {displayProgress}%
                  {progress > 75 && progress < 100 && ' (Quiz Required)'}
                  {progress === 100 && ' (Completed)'}
                </Text>
              </div>

              <div className={styles.progressContentWrapper}>
                <div className={styles.progressBarWrapper}>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${displayProgress}%` }}
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
