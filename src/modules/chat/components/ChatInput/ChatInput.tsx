import { Button, Input, Tag } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import type { InputRef } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "@src/modules/LearningPath/routes/paths";
import { useKeyPress } from "@src/modules/shared/hooks/useKeyPress";

function ChatInput() {
  const inputRef = useRef<InputRef>(null);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useKeyPress({
    key: "Enter",
    callback: () => {
      navigate(PATH.LearningPath);
    },
    conditions: [inputValue.trim().length > 0],
  });

  return (
    <div className="chat-input-wrapper">
      <Input
        ref={inputRef}
        className="chat-input"
        placeholder="What Would You Like To Learn? (e.g. 'Front end development')"
        size="large"
        value={inputValue} // Add value binding
        onChange={(e) => setInputValue(e.target.value)} // Add change handler
      />

      <div className="chat-content">
        <div className="popular-topics">
          <p>Popular topics:</p>
          <div className="tags">
            <Tag color="blue">React</Tag>
            <Tag color="blue">Next.js</Tag>
            <Tag color="blue">English</Tag>
            <Tag color="blue">French</Tag>
            <Tag color="blue">C#</Tag>
          </div>
        </div>
        <Button
          type="primary"
          className="chat-input-button"
          disabled={inputValue.trim().length === 0}
          onClick={() => {
            navigate(PATH.LearningPath);
          }}
        >
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
}

export default ChatInput;
