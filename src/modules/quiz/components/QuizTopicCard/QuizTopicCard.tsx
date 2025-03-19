import type React from 'react';
import { Card, Progress } from 'antd';
import { BookOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './_QuizTopicCard.scss';

interface QuizTopicCardProps {
  topic: {
    name: string;
    description: string;
  };
  currentQuestion?: number;
  totalQuestions?: number;
}

const QuizTopicCard: React.FC<QuizTopicCardProps> = ({
  topic,
  currentQuestion = 0,
  totalQuestions = 0,
}) => {
  const progressPercent =
    totalQuestions > 0
      ? Math.round((currentQuestion / totalQuestions) * 100)
      : 0;

  return (
    <div className="quiz-topic-card">
      <Card>
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
              strokeWidth={8}
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
