"use client"

import { ChevronRight, Trash2, ExternalLink } from 'lucide-react'
import { useState } from "react"

interface RoadmapCardProps {
  roadmap: {
    id: string
    name: string
    description: string
    modules: number
    estimatedTime: string
    difficulty: string
  }
  index: number
  onClick: () => void
  onDelete?: (id: string, e: React.MouseEvent) => void
}

export function RoadmapCard({ roadmap, onClick, onDelete }: RoadmapCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDelete) {
      onDelete(roadmap.id, e)
    }
  }

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }
  
  return (
    <div 
      className="roadmap-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="roadmap-content">
        <h3>{roadmap.name}</h3>
        <p>{roadmap.description}</p>
        <div className="roadmap-meta">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            {roadmap.modules} Modules
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {roadmap.estimatedTime}
          </span>
        </div>
        <div className="roadmap-level">
          <span>{roadmap.difficulty}</span>
        </div>
        
        {/* Action buttons that appear on hover */}
        <div className={`roadmap-buttons ${isHovering ? 'visible' : ''}`}>
          <button 
            className="roadmap-button open-button"
            onClick={handleOpen}
            aria-label="Open roadmap"
          >
            <ExternalLink size={16} />
            <span>Open</span>
          </button>
          <button 
            className="roadmap-button delete-button"
            onClick={handleDelete}
            aria-label="Delete roadmap"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
      <div 
        className="roadmap-action"
        onClick={handleOpen}
        style={{ cursor: 'pointer' }}
      >
        <ChevronRight size={20} />
      </div>
    </div>
  )
}
