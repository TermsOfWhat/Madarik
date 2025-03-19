import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Button } from "antd";
import { MessageOutlined, ReloadOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { generateModuleAdvice } from "../../../shared/utils/aiChat";
import "./ModuleAdvisor.scss";

const { Title } = Typography;

interface ModuleAdvisorProps {
  topicName: string;
  topicDifficulty: string;
  chapters: {
    name: string;
    description: string;
  }[];
  roadmapContext?: string;
}

const ModuleAdvisor: React.FC<ModuleAdvisorProps> = ({
  topicName,
  topicDifficulty,
  chapters,
  roadmapContext,
}) => {
  const [advice, setAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAdvisor, setShowAdvisor] = useState<boolean>(false);

  // Generate a unique key for this specific module's advice
  const storageKey = `module-advice-${topicName
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  // Try to load cached advice on initial render
  useEffect(() => {
    const cachedAdvice = localStorage.getItem(storageKey);
    if (cachedAdvice) {
      setAdvice(cachedAdvice);
    }
  }, [storageKey]);

  const fetchAdvice = async () => {
    setIsLoading(true);

    try {
      const result = await generateModuleAdvice({
        topicName,
        topicDifficulty,
        chapters,
        roadmapContext,
      });

      // Save to state
      setAdvice(result);

      // Save to localStorage
      localStorage.setItem(storageKey, result);
    } catch (error) {
      console.error("Error fetching module advice:", error);
      setAdvice(
        "<p>I couldn't generate advice for this topic at the moment. Please try again later.</p>"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showAdvisor && !advice) {
      fetchAdvice();
    }
  }, [showAdvisor, topicName]);

  const toggleAdvisor = () => {
    setShowAdvisor((prev) => !prev);
  };

  // Force refresh advice (clear cache and get new advice)
  const refreshAdvice = () => {
    // Clear cached advice
    localStorage.removeItem(storageKey);
    // Fetch new advice
    fetchAdvice();
  };

  return (
    <div className="module-advisor-container">
      <Button
        type="primary"
        icon={<MessageOutlined />}
        className="module-advisor-toggle"
        onClick={toggleAdvisor}
      >
        Learning Guidance
      </Button>

      <AnimatePresence>
        {showAdvisor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="module-advisor-panel"
          >
            <Card className="module-advisor-card">
              <div className="module-advisor-header">
                <Title level={4}>Module Advisor</Title>
                {!isLoading && (
                  <Button
                    type="text"
                    size="small"
                    className="module-advisor-close"
                    onClick={toggleAdvisor}
                  >
                    Close
                  </Button>
                )}
              </div>

              <div className="module-advisor-content">
                {isLoading ? (
                  <div className="module-advisor-loading">
                    <Spin />
                    <div className="loading-message">
                      Analyzing this topic...
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="module-advisor-message"
                      dangerouslySetInnerHTML={{ __html: advice }}
                    />
                    <Button
                      icon={<ReloadOutlined />}
                      onClick={refreshAdvice}
                      className="module-advisor-refresh"
                    >
                      Get new advice
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleAdvisor;
