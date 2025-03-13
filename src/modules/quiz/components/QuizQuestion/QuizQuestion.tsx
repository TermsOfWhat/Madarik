import React, { useState, useEffect } from 'react';
import { Card, Radio, Checkbox, Progress, Space, Button } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from '@ant-design/icons';
import { Question } from '../../types/quiz.types';
import './_QuizQuestion.scss';

interface QuizQuestionProps {
  question: Question;
  selectedAnswers: string[];
  timeRemaining: number;
  onAnswerSelect: (answers: string[]) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswers,
  timeRemaining,
  onAnswerSelect,
  onNext,
  isLastQuestion,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState(question.options);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const correctAnswers = question.options.filter((opt) => opt.isCorrect);

  useEffect(() => {
    if (question.type === 'single') {
      setShowExplanation(selectedAnswers.length > 0);
    } else {
      setShowExplanation(selectedAnswers.length === correctAnswers.length);
    }
  }, [selectedAnswers, correctAnswers.length, question.type]);


  useEffect(() => {
    const shuffled = [...question.options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setIsAnswerLocked(false);
  }, [question]);

  const handleSingleChoice = (value: string) => {
    if (!isAnswerLocked) {
      onAnswerSelect([value]);
      setIsAnswerLocked(true);
    }
  };

  const handleMultipleChoice = (checkedValues: string[]) => {
    if (!isAnswerLocked) {
      onAnswerSelect(checkedValues);
      if (
        checkedValues.length ===
        question.options.filter((opt) => opt.isCorrect).length
      ) {
        setIsAnswerLocked(true);
      }
    }
  };

  const isAnswerCorrect = () => {
    return (
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((ans) =>
        correctAnswers.some((correct) => correct.id === ans),
      )
    );
  };

  return (
    <motion.div className="quiz-question w-full max-w-4xl mx-auto p-6">
      <Card>
        <AnimatePresence
          mode="wait"
          onExitComplete={() => setShowExplanation(false)}
        >
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="question-animate-container"
          >
            <div className="question-content">
              <div className="question-header">
                <div className="question-number">
                  Question {question.id.replace('q', '')}:
                </div>
                <Progress
                  type="circle"
                  percent={(timeRemaining / 20) * 100}
                  format={() => timeRemaining}
                  size={60}
                  strokeColor="#3887d9"
                  strokeWidth={8}
                  status={timeRemaining < 5 ? 'exception' : 'normal'}
                />
              </div>

              <h2 className="question-text">
                <span className="text-gray-500"></span> {question.text}
              </h2>

              {question.image && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={question.image}
                  alt="Question"
                  className="mb-12 rounded-xl w-full max-h-80 object-cover shadow-md"
                />
              )}

              <div className="options-container">
                {question.type === 'single' ? (
                  <Radio.Group
                    onChange={(e) => handleSingleChoice(e.target.value)}
                    value={selectedAnswers[0]}
                    className="w-full"
                    disabled={isAnswerLocked}
                  >
                    <Space direction="vertical" className="w-full" size={12}>
                      {shuffledOptions.map((option) => (
                        <Radio key={option.id} value={option.id}>
                          {option.text}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                ) : (
                  <>
                    <div className="multiple-choice-hint">
                      <InfoCircleFilled /> Select {correctAnswers.length}{' '}
                      correct answer{correctAnswers.length > 1 ? 's' : ''}
                    </div>
                    <Checkbox.Group
                      onChange={handleMultipleChoice}
                      value={selectedAnswers}
                      className="w-full"
                      disabled={isAnswerLocked}
                    >
                      <Space direction="vertical" className="w-full" size={12}>
                        {shuffledOptions.map((option) => (
                          <Checkbox key={option.id} value={option.id}>
                            {option.text}
                          </Checkbox>
                        ))}
                      </Space>
                    </Checkbox.Group>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showExplanation && (
            <motion.div
              key={`explanation-${question.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="answer-explanation"
            >
              <div className="answer-status">
                {isAnswerCorrect() ? (
                  <CheckCircleFilled className="correct-icon" />
                ) : (
                  <CloseCircleFilled className="incorrect-icon" />
                )}
              </div>
              <div className="explanation-content">
                <h3>Correct Answer{correctAnswers.length > 1 ? 's' : ''}:</h3>
                <ul>
                  {correctAnswers.map((answer) => (
                    <li key={answer.id}>{answer.text}</li>
                  ))}
                </ul>
                {question.explanation && (
                  <>
                    <h3>Explanation:</h3>
                    <p>{question.explanation}</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="button-container">
          <Button
            type="primary"
            onClick={onNext}
            className="next-button"
            disabled={!showExplanation}
          >
            {isLastQuestion ? 'Show Results' : 'Next Question'}
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default QuizQuestion;
