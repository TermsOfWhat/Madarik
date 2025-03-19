"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Alert } from "antd"
import { useAppDispatch, useAppSelector } from "../shared/store"
import { fetchRoadmaps } from "../dashboard/data/roadmapsThunk"
import { RoadmapCard } from "../dashboard/components/RoadmapCard"
import { useNavigate } from "react-router-dom"
import RoadmapsSkeleton from "./components/RoadmapsSkeleton"
import { EnhancedSearch } from "./components/Search/enhanced-search"
import { filterBySearch } from "../shared/utils/search-utils"
import "./roadmaps.scss"
import { resetRoadmap } from "../LearningPath/data/pathSlice"

export default function Roadmaps() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState("")

  const { data: roadmapsData, isLoading, error } = useAppSelector((state) => state.roadmaps)

  useEffect(() => {
    dispatch(fetchRoadmaps())
  }, [dispatch])

  if (isLoading) {
    return <RoadmapsSkeleton />
  }

  if (error) {
    return (
      <Alert message="Error" description="Failed to load roadmaps. Please try again later." type="error" showIcon />
    )
  }

  const roadmaps = roadmapsData.map((roadmap) => ({
    id: roadmap.id,
    name: roadmap.name,
    description: roadmap.description,
    modules: roadmap.numberOfTopics,
    estimatedTime: roadmap.estimatedTime || "TBD",
    difficulty: roadmap.difficulty || "Easy",
  }))

  const filteredRoadmaps = filterBySearch(roadmaps, searchTerm, (roadmap) => `${roadmap.name} ${roadmap.description}`)

  const handleRoadmapClick = (roadmapId: string) => {
    dispatch(resetRoadmap())
    navigate(`/roadmap/${roadmapId}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="roadmaps-container">
      <div className="roadmaps-header">
        <h1>Learning Roadmaps</h1>
        <EnhancedSearch
          placeholder="Search roadmaps by name or description..."
          onChange={handleSearchChange}
          value={searchTerm}
          className="search-container"
        />
      </div>

      {filteredRoadmaps.length === 0 ? (
        <div className="no-results">
          <p>No roadmaps found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="roadmaps-grid">
          {filteredRoadmaps.map((roadmap, index) => (
            <RoadmapCard
              key={roadmap.id}
              roadmap={roadmap}
              index={index}
              onClick={() => handleRoadmapClick(roadmap.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

