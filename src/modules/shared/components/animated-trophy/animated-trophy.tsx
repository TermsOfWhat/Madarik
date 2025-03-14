"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

interface AnimatedTrophyProps {
  className?: string
  size?: number
  color?: string
}

export default function AnimatedTrophy({ className = "", size = 16, color = "#eab308" }: AnimatedTrophyProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 3000)
      return () => clearTimeout(timer)
    }, 8000)

    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={`animated-trophy-container ${className}`}>
      <motion.div
        animate={
          isAnimating
            ? {
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="trophy-wrapper"
      >
        <Trophy className="trophy-icon" size={size} color={color} fill={color} />
      </motion.div>

      {isAnimating && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="sparkle"
              initial={{
                scale: 0,
                opacity: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, Math.cos((i * Math.PI) / 4) * 20],
                y: [0, Math.sin((i * Math.PI) / 4) * 20],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: i * 0.05,
              }}
            />
          ))}

          <motion.div
            className="trophy-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  )
}

