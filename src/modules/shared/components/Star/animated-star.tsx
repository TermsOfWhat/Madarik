"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface AnimatedStarProps {
  className?: string
}

export default function AnimatedStar({ className }: AnimatedStarProps) {
  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Star className={`${className} fill-current`} />
      </motion.div>
      {/* Sparkle effects */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 left-0 w-1 h-1 bg-yellow-300 rounded-full"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, (i % 2 ? 15 : -15) * Math.cos((i * Math.PI) / 2)],
            y: [0, (i % 2 ? 15 : -15) * Math.sin((i * Math.PI) / 2)],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

