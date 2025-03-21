import { Button, Input, Tag } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import type { InputRef } from "antd";
import { useKeyPress } from "@src/modules/shared/hooks/useKeyPress";
import { fetchRoadmap } from "@src/modules/LearningPath/data/pathThunk";
import { useAppDispatch } from "@src/modules/shared/store";
import { handleError } from "@src/modules/shared/utils/errorMessage";
import LoaderRoadmap from "@src/modules/shared/components/LoaderRoadmap/LoaderRoadmap";
import { useRouter } from "@src/modules/shared/hooks/useNavigate";

function ChatInput() {
  const inputRef = useRef<InputRef>(null);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useKeyPress({
    key: "Enter",
    callback: () => {
      handleSubmit();
    },
    conditions: [inputValue.trim().length > 0, !isLoading],
  });

  const handleSubmit = () => {
    setIsLoading(true);

    dispatch(fetchRoadmap({ message: inputValue }))
      .unwrap()
      .then((data) => {
        setIsLoading(false);
        router.push(`/roadmap/${data.id}`);
      })
      .catch(() => {
        setIsLoading(false);
        handleError(
          "I apologize, but I cannot generate a roadmap for this request."
        );
      });
  };

  return (
    <>
      <LoaderRoadmap
        isLoading={isLoading}
        message="Roadmap generation may take a few seconds... We're creating a personalized learning experience just for you!"
      />

      <div className="chat-input-wrapper">
        <Input
          ref={inputRef}
          className="chat-input"
          placeholder="What Would You Like To Learn? (e.g. 'Front end development')"
          size="large"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />

        <div className="chat-content">
          <div className="popular-topics">
            <p>Popular topics:</p>
            <div className="tags">
              {popularTopics.map((topic) => (
                <Tag
                  key={topic}
                  color="blue"
                  style={{ cursor: "pointer" }}
                  onClick={() => !isLoading && setInputValue(topic)}
                >
                  {topic}
                </Tag>
              ))}
            </div>
          </div>
          <Button
            type="primary"
            className="chat-input-button"
            disabled={inputValue.trim().length === 0 || isLoading}
            onClick={() => {
              handleSubmit();
            }}
            loading={isLoading}
          >
            <SendOutlined />
          </Button>
        </div>
      </div>
    </>
  );
}

export default ChatInput;

const popularTopics = [
  "Artificial Intelligence",
  "Machine Learning",
  "Blockchain",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science",
  "Web Development",
  "Space Exploration",
  "Virtual Reality",
  "Quantum Computing",
];
