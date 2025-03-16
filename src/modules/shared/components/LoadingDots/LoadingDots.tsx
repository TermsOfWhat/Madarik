"use client";

import React from 'react';
import { motion } from 'framer-motion';
import './_LoadingDots.scss';

interface LoadingDotsProps {
  message?: {
    title?: string;
    subtitle?: string;
  };
  fullScreen?: boolean;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ 
  message,
  fullScreen = true 
}) => {
  return (
    <div className={`loading-dots-container ${!fullScreen ? 'loading-dots-inline' : ''}`}>
      <div className="loading-content">
        <div className="loading-dots-wrapper">
          <motion.div 
            className="dot"
            animate={{
              scale: [1, 0.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="dot"
            animate={{
              scale: [1, 0.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="dot"
            animate={{
              scale: [1, 0.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="dot"
            animate={{
              scale: [1, 0.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.6,
              ease: "easeInOut"
            }}
          />
        </div>
        {message && (
          <div className="loading-message">
            {message.title && <h3>{message.title}</h3>}
            {message.subtitle && <p>{message.subtitle}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingDots; 