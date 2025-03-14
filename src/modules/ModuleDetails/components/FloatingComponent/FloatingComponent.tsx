import { Button, Typography, Flex } from "antd";
import { Zap } from "lucide-react";
import styles from "./FloatingComponent.module.scss";
import { useState } from "react";

const { Title, Text } = Typography;

interface FloatingComponentProps {
  sections: Array<{
    title: string;
  }>;
}

const FloatingComponent: React.FC<FloatingComponentProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(0);
  return (
    <div className={styles.floatingContainer}>
      <div className={styles.stickyWrapper}>
        <Flex vertical className={styles.buttonContainer} gap={20}>
          {sections.map((section, index) => (
            <Flex key={index} gap={10} align="center">
              <Button
                type={activeSection === index ? "primary" : "default"}
                shape="circle"
                size="small"
                className={
                  activeSection === index
                    ? styles.activeButton
                    : styles.inactiveButton
                }
                onClick={() => {
                  setActiveSection(index);
                  document.getElementById(`section-${index}`)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {index + 1}
              </Button>

              {section.title}
            </Flex>
          ))}
        </Flex>

        <div className={styles.quickNavContainer}>
          <div className={styles.quickNavHeader}>
            <Zap size={16} className={styles.zapIcon} />
            <Title level={5} className={styles.quickNavTitle}>
              Quick Navigation
            </Title>
          </div>
          <Text className={styles.quickNavText}>
            Scroll through the sections or use the buttons above to navigate.
            The card will update automatically as you scroll.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default FloatingComponent;
