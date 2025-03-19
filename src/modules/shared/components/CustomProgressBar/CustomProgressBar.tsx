import { useRef } from 'react';
import { Progress } from 'antd';

interface CustomProgressBarProps {
  percent: number;
}

export default function CustomProgressBar({ percent }: CustomProgressBarProps) {
  const progressRef = useRef(null);

  return (
    <div ref={progressRef}>
      <Progress
        percent={percent}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
    </div>
  );
} 