"use client"

import type React from "react"
import { Card } from "antd"
import { Clock, HelpCircle } from "lucide-react"
import "./_quizCard.scss"

interface QuizCardProps {
  quiz: {
    id: string
    title: string
    description: string
    questions: any[]
    totalTime: number
  }
  onClick: () => void
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
  return (
    <Card
      hoverable
      className="h-full transition-all duration-300 border-0 overflow-hidden rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
      bodyStyle={{ padding: 0 }}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">{quiz.title}</h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{quiz.description}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-blue-600 font-medium">
            <HelpCircle size={16} className="mr-1.5" />
            <span className="text-sm">{quiz.questions.length} questions</span>
          </div>

          <div className="flex items-center text-blue-600 font-medium">
            <Clock size={16} className="mr-1.5" />
            <span className="text-sm">{quiz.totalTime} minutes</span>
          </div>
        </div>
      </div>

      <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-400"></div>
    </Card>
  )
}

