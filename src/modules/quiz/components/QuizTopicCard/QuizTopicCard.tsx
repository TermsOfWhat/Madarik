import type React from 'react';
import { Card, Progress, Modal } from 'antd';
import { BookOutlined, InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './_QuizTopicCard.scss';
import { useState } from 'react';

interface QuizTopicCardProps {
  topic: {
    name: string;
    description: string;
  };
  currentQuestion?: number;
  totalQuestions?: number;
  onExitQuiz?: () => void;
}

const QuizTopicCard: React.FC<QuizTopicCardProps> = ({
  topic,
  currentQuestion = 0,
  totalQuestions = 0,
  onExitQuiz,
}) => {
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  const progressPercent =
    totalQuestions > 0
      ? Math.round((currentQuestion / totalQuestions) * 100)
      : 0;

  const handleExitClick = () => {
    setIsExitModalVisible(true);
  };

  const handleExitConfirm = () => {
    setIsExitModalVisible(false);
    onExitQuiz?.();
  };

  const handleExitCancel = () => {
    setIsExitModalVisible(false);
  };

  return (
    <div className="quiz-topic-card">
      <Card>
        {onExitQuiz && (
          <>
            <button 
              className="exit-quiz-button" 
              onClick={handleExitClick}
              aria-label="Exit quiz"
            >
              <ArrowLeftOutlined />
              <span>Back to Topic</span>
            </button>

            <Modal
              title="Exit Quiz"
              open={isExitModalVisible}
              onOk={handleExitConfirm}
              onCancel={handleExitCancel}
              okText="Yes, Exit"
              cancelText="No, Stay"
              okButtonProps={{ 
                danger: true,
                className: "exit-confirm-button" 
              }}
              cancelButtonProps={{
                className: "exit-cancel-button"
              }}
              className="exit-confirmation-modal"
              centered
            >
              <p className="exit-confirmation-text">Are you sure you want to exit the quiz? Your progress will be lost.</p>
            </Modal>
          </>
        )}
        
        <div className="topic-header">
          <div className="topic-icon">
            <BookOutlined />
          </div>
          <h1 className="topic-title">{topic.name || 'Quiz'}</h1>
        </div>

        <div className="topic-description">
          <div className="description-icon">
            <InfoCircleOutlined />
          </div>
          <p className="description-text">
            {topic.description || 'Test your knowledge on this topic'}
          </p>
        </div>

        {totalQuestions > 0 && (
          <div className="topic-progress">
            <div className="progress-label">
              <span className="label-text">Progress</span>
              <span className="label-text">
                {currentQuestion} of {totalQuestions}
              </span>
            </div>
            <Progress
              percent={progressPercent}
              showInfo={false}
              size="small"
              strokeColor={{
                '0%': '#3887d9',
                '100%': '#2563eb',
              }}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuizTopicCard;
