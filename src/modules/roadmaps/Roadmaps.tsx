"use client"

import { useEffect } from "react"
import { Alert } from "antd"
import { useAppDispatch, useAppSelector } from "../shared/store"
import { fetchRoadmaps } from "../dashboard/data/roadmapsThunk"
import { RoadmapCard } from "../dashboard/components/RoadmapCard"
import { useNavigate } from "react-router-dom"
import RoadmapsSkeleton from "./components/RoadmapsSkeleton"
import "./roadmaps.scss"
import { resetRoadmap } from "../LearningPath/data/pathSlice"

export default function Roadmaps() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const {
    data: roadmapsData,
    isLoading,
    error,
  } = useAppSelector((state) => state.roadmaps)

  useEffect(() => {
    dispatch(fetchRoadmaps())
  }, [dispatch])

  if (isLoading) {
    return <RoadmapsSkeleton />
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load roadmaps. Please try again later."
        type="error"
        showIcon
      />
    )
  }

  const roadmaps = roadmapsData.map((roadmap) => ({
    id: roadmap.id,
    name: roadmap.name,
    description: roadmap.description,
    modules: roadmap.numberOfTopics,
    estimatedTime: roadmap.estimatedTime || "TBD",
    level: roadmap.difficutly || "Easy",
  }))

  const handleRoadmapClick = (roadmapId: string) => {
    dispatch(resetRoadmap())
    navigate(`/roadmap/${roadmapId}`)
  }

  return (
    <div className="roadmaps-container">
      <div className="roadmaps-header">
        <h1>Learning Roadmaps</h1>
      </div>
      <div className="roadmaps-grid">
        {roadmaps.map((roadmap, index) => (
          <RoadmapCard
            key={roadmap.id}
            roadmap={roadmap}
            index={index}
            onClick={() => handleRoadmapClick(roadmap.id)}
          />
        ))}
      </div>
    </div>
  )
} 