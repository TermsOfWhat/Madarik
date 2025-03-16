import { Spin } from "antd";
import "./LoaderTopic.scss";

interface LoaderTopicProps {
  isLoading: boolean;
  message?: string;
}

function LoaderTopic({
  isLoading,
  message = "Loading topic content...",
}: LoaderTopicProps) {
  if (!isLoading) return null;

  return (
    <div className="loader-topic-container">
      <div className="loader-topic-content">
        <Spin size="default" className="loader-topic-spinner" />
        <div className="loader-topic-message">
          <p className="loader-topic-info">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default LoaderTopic;
