import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { Card, Radio, Checkbox, Progress, Space, Button } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
  SoundOutlined,
  SoundFilled,
  DownOutlined,
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


function useAudioManager() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef({
    correctSound: new Audio('/audio/correct-answer.mp3.wav'),
    wrongSound: new Audio('/audio/wrong-answer.mp3.mp3'),
    timerSound: new Audio('/audio/twenty-seconds.mp3.mp3'),
    lastTenSecondsSound: new Audio('/audio/last-ten-seconds.mp3.mp3')
  });
  
  const shouldPlayRef = useRef({
    correctSound: false,
    wrongSound: false,
    timerSound: false,
    lastTenSecondsSound: false
  });

  const stopAllSounds = useCallback(() => {
    Object.values(audioRef.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    Object.keys(shouldPlayRef.current).forEach(key => {
      shouldPlayRef.current[key as keyof typeof shouldPlayRef.current] = false;
    });
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMutedState = !prev;
      if (newMutedState) {
        // If muting, pause all sounds but remember their state
        Object.values(audioRef.current).forEach(audio => {
          if (!audio.paused) {
            const key = Object.keys(audioRef.current).find(
              k => audioRef.current[k as keyof typeof audioRef.current] === audio
            ) as keyof typeof shouldPlayRef.current;
            shouldPlayRef.current[key] = true;
          }
          audio.pause();
        });
      } else {
        // If unmuting, resume sounds that should be playing
        Object.keys(shouldPlayRef.current).forEach(key => {
          const soundKey = key as keyof typeof shouldPlayRef.current;
          if (shouldPlayRef.current[soundKey]) {
            const audio = audioRef.current[soundKey];
            audio.currentTime = 0;
            audio.play().catch(() => {
              console.log('Failed to play audio');
            });
            
            // Reset the flag after playing
            if (soundKey !== 'timerSound' && soundKey !== 'lastTenSecondsSound') {
              shouldPlayRef.current[soundKey] = false;
            }
          }
        });
      }
      return newMutedState;
    });
  }, []);

  const playSound = useCallback((soundKey: keyof typeof audioRef.current, force = false) => {
    shouldPlayRef.current[soundKey] = true;
    
    if ((!isMuted || force) && audioRef.current[soundKey]) {
      const audio = audioRef.current[soundKey];
      audio.pause();
      audio.currentTime = 0;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          audio.pause();
          audio.currentTime = 0;
          shouldPlayRef.current[soundKey] = false;
        });
      }
    }
    
    if (soundKey !== 'timerSound' && soundKey !== 'lastTenSecondsSound') {
      setTimeout(() => {
        shouldPlayRef.current[soundKey] = false;
      }, 100);
    }
  }, [isMuted]);
  
  const markSoundForPlaying = useCallback((soundKey: keyof typeof audioRef.current, shouldPlay: boolean) => {
    shouldPlayRef.current[soundKey] = shouldPlay;
  }, []);

  return { isMuted, toggleMute, playSound, stopAllSounds, markSoundForPlaying };
}

export const QuizQuestion: React.FC<QuizQuestionProps> = memo(
  ({
    question,
    selectedAnswers,
    timeRemaining,
    onAnswerSelect,
    onNext,
    isLastQuestion,
  }) => {
    const { isMuted, toggleMute, playSound, stopAllSounds, markSoundForPlaying } = useAudioManager();
    const [showExplanation, setShowExplanation] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState(question.options);
    const [isAnswerLocked, setIsAnswerLocked] = useState(false);
    const [hasPlayedAnswerSound, setHasPlayedAnswerSound] = useState(false);
    const prevTimeRemainingRef = useRef(timeRemaining);
    const questionIdRef = useRef(question.id);
    const [isContentCollapsed, setIsContentCollapsed] = useState(false);

    const correctAnswers = useMemo(
      () => question.options.filter((opt) => opt.isCorrect),
      [question.options],
    );

    useEffect(() => {
      if (questionIdRef.current !== question.id) {
        questionIdRef.current = question.id;
        stopAllSounds();
        setHasPlayedAnswerSound(false);
        markSoundForPlaying('timerSound', false);
        markSoundForPlaying('lastTenSecondsSound', false);
      }
    }, [question.id, stopAllSounds, markSoundForPlaying]);

    useEffect(() => {
      if (!hasPlayedAnswerSound) {
        if (timeRemaining === 20) {
          playSound('timerSound');
          markSoundForPlaying('timerSound', true);
        }
      }
      
      prevTimeRemainingRef.current = timeRemaining;
    }, [timeRemaining, playSound, hasPlayedAnswerSound, markSoundForPlaying]);

    useEffect(() => {
      if (selectedAnswers.length > 0 && !hasPlayedAnswerSound) {
        const isCorrect = selectedAnswers.every((ans) =>
          correctAnswers.some((correct) => correct.id === ans)
        );
        
        const shouldPlayNow = 
          question.type === 'single' || 
          (question.type !== 'single' && selectedAnswers.length === correctAnswers.length);
          
        if (shouldPlayNow) {
          playSound(isCorrect ? 'correctSound' : 'wrongSound');
          setHasPlayedAnswerSound(true);
          
          markSoundForPlaying('timerSound', false);
          markSoundForPlaying('lastTenSecondsSound', false);
        }
      }
    }, [selectedAnswers, correctAnswers, question.type, playSound, hasPlayedAnswerSound, markSoundForPlaying]);

    useEffect(() => {
      if (question.type === 'single') {
        setShowExplanation(selectedAnswers.length > 0);
      } else {
        setShowExplanation(selectedAnswers.length === correctAnswers.length);
      }
    }, [selectedAnswers, correctAnswers.length, question.type]);

    const handleSoundToggle = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMute();
    }, [toggleMute]);

    useEffect(() => {
      const shuffled = [...question.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
      setIsAnswerLocked(false);
    }, [question]);

    const handleSingleChoice = useCallback(
      (value: string) => {
        if (!isAnswerLocked) {
          onAnswerSelect([value]);
          setIsAnswerLocked(true);
        }
      },
      [isAnswerLocked, onAnswerSelect],
    );

    const handleMultipleChoice = useCallback(
      (checkedValues: string[]) => {
        if (!isAnswerLocked) {
          onAnswerSelect(checkedValues);
          if (checkedValues.length === correctAnswers.length) {
            setIsAnswerLocked(true);
          }
        }
      },
      [isAnswerLocked, onAnswerSelect, correctAnswers.length],
    );

    const isAnswerCorrect = useCallback(() => {
      return (
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every((ans) =>
          correctAnswers.some((correct) => correct.id === ans),
        )
      );
    }, [selectedAnswers, correctAnswers]);

    const questionAnimations = useMemo(
      () => ({
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.3 },
      }),
      [],
    );

    const explanationAnimations = useMemo(
      () => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      }),
      [],
    );

    const progressPercent = useMemo(
      () => (timeRemaining / 20) * 100,
      [timeRemaining],
    );

    const progressStatus = useMemo(
      () => (timeRemaining < 5 ? 'exception' : 'normal'),
      [timeRemaining],
    );

    const handleExitComplete = useCallback(() => {
      setShowExplanation(false);
    }, []);

    useEffect(() => {
      return () => {
        stopAllSounds();
      };
    }, [stopAllSounds]);

    const handleNextClick = useCallback(() => {
      stopAllSounds();
      onNext();
    }, [stopAllSounds, onNext]);

    const handleCollapseExplanation = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setIsContentCollapsed(prev => !prev);
    }, []);

    return (
      <motion.div className="quiz-question w-full max-w-4xl mx-auto p-6">
        <Card>
          <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
            <motion.div
              key={question.id}
              {...questionAnimations}
              className="question-animate-container"
            >
              <div className="question-content">
                <div className="question-header">
                  <div className="question-number">
                    Question {question.id.replace('q', '')}:
                  </div>
                  <div className="timer-container">
                    <button 
                      className={`sound-toggle ${isMuted ? 'muted' : ''}`}
                      onClick={handleSoundToggle}
                      type="button"
                    >
                      {isMuted ? (
                        <SoundOutlined className="sound-icon" />
                      ) : (
                        <SoundFilled className="sound-icon" />
                      )}
                      {isMuted && <div className="mute-line" />}
                    </button>
                    <Progress
                      type="circle"
                      percent={progressPercent}
                      format={() => timeRemaining}
                      size={60}
                      strokeColor="#3887d9"
                      strokeWidth={8}
                      status={progressStatus}
                    />
                  </div>
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
                        <InfoCircleFilled /> Multiple-choice question ({correctAnswers.length} {correctAnswers.length === 1 ? 'answer' : 'answers'} required)
                      </div>
                      <Checkbox.Group
                        onChange={handleMultipleChoice}
                        value={selectedAnswers}
                        className="w-full"
                        disabled={isAnswerLocked}
                      >
                        <Space
                          direction="vertical"
                            className="w-full"
                          size={12}
                        >
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
                {...explanationAnimations}
                className="answer-explanation"
              >
                <div 
                  className="answer-status"
                  onClick={handleCollapseExplanation}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCollapseExplanation(e as any);
                    }
                  }}
                >
                  <div className="status-left">
                    {isAnswerCorrect() ? (
                      <CheckCircleFilled className="correct-icon" />
                    ) : (
                      <CloseCircleFilled className="incorrect-icon" />
                    )}
                    <h3>Correct Answer{correctAnswers.length > 1 ? 's' : ''}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isContentCollapsed ? 0 : 180 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="chevron-icon"
                  >
                    <DownOutlined />
                  </motion.div>
                </div>
                <AnimatePresence mode="wait">
                  {!isContentCollapsed && (
                    <motion.div 
                      className="explanation-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.3,
                        ease: "easeInOut",
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 }
                      }}
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="button-container">
            <Button
              type="primary"
              onClick={handleNextClick}
              className="next-button"
              disabled={!showExplanation}
            >
              {isLastQuestion ? 'Show Results' : 'Next Question'}
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    );
  },
);

export default QuizQuestion;
