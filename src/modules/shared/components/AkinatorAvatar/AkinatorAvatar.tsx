import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Button } from "antd";
import { MessageOutlined, ReloadOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import "./AkinatorAvatar.scss";
import { generateRoadmapAdvice } from "../../utils/aiChat";

const { Title, Paragraph } = Typography;

interface AkinatorAvatarProps {
  roadmapName: string;
  roadmapDescription: string;
  modules: { name: string; description: string }[];
  difficulty: string;
}

// Avatar states with corresponding images

const AkinatorAvatar: React.FC<AkinatorAvatarProps> = ({
  roadmapName,
  roadmapDescription,
  modules,
  difficulty,
}) => {
  const [advice, setAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAvatar, setShowAvatar] = useState<boolean>(false);

  // Generate a unique key for this specific roadmap's advice
  const storageKey = `roadmap-advice-${roadmapName
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
      const result = await generateRoadmapAdvice({
        roadmapName,
        roadmapDescription,
        modules,
        difficulty,
      });

      // Save to state
      setAdvice(result);

      // Save to localStorage
      localStorage.setItem(storageKey, result);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice(
        "<p>I couldn't generate advice for this roadmap at the moment. Please try again later.</p>"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showAvatar && !advice) {
      fetchAdvice();
    }
  }, [showAvatar, roadmapName]);

  const toggleAvatar = () => {
    setShowAvatar((prev) => !prev);
  };

  // Force refresh advice (clear cache and get new advice)
  const refreshAdvice = () => {
    // Clear cached advice
    localStorage.removeItem(storageKey);
    // Fetch new advice
    fetchAdvice();
  };

  return (
    <div className="akinator-container">
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        className="akinator-toggle-button"
        onClick={toggleAvatar}
      />

      <AnimatePresence>
        {showAvatar && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="akinator-card-container"
          >
            <Card className="akinator-card">
              <div className="akinator-header">
                <motion.div
                  animate={{ scale: isLoading ? [1, 1.05, 1] : 1 }}
                  transition={{
                    repeat: isLoading ? Infinity : 0,
                    duration: 1.5,
                  }}
                ></motion.div>
                <Title level={4}>Learning Advisor</Title>
              </div>

              <div className="akinator-content">
                {isLoading ? (
                  <div className="akinator-loading">
                    <Spin />
                    <Paragraph>Analyzing your roadmap...</Paragraph>
                  </div>
                ) : (
                  <>
                    <div
                      className="akinator-html-message"
                      dangerouslySetInnerHTML={{ __html: advice }}
                    />
                    <Button
                      icon={<ReloadOutlined />}
                      onClick={refreshAdvice}
                      className="akinator-refresh"
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

export default AkinatorAvatar;
