"use client"

import { Skeleton } from "antd"
import { useRef, useEffect, useState } from "react"

function DashboardSkeleton() {
  // Store element dimensions
  const [dimensions, setDimensions] = useState({
    header: { width: "100%", height: 80 },
    continueLearning: { width: "100%", height: 200 },
    stats: { width: "100%", height: 100 },
    roadmaps: { width: "100%", height: 300 },
  })

  // Refs to measure actual components
  const headerRef = useRef<HTMLDivElement>(null)
  const continueLearningRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const roadmapsRef = useRef<HTMLDivElement>(null)

  // Function to update dimensions based on actual elements
  const updateDimensions = () => {
    if (headerRef.current) {
      setDimensions((prev) => ({
        ...prev,
        header: {
          width: `${headerRef.current?.offsetWidth || 0}px`,
          height: `${headerRef.current?.offsetHeight || 0}px`,
        },
      }))
    }

    if (continueLearningRef.current) {
      setDimensions((prev) => ({
        ...prev,
        continueLearning: {
          width: `${continueLearningRef.current?.offsetWidth || 0}px`,
          height: `${continueLearningRef.current?.offsetHeight || 0}px`,
        },
      }))
    }

    if (statsRef.current) {
      setDimensions((prev) => ({
        ...prev,
        stats: {
          width: `${statsRef.current?.offsetWidth || 0}px`,
          height: `${statsRef.current?.offsetHeight || 0}px`,
        },
      }))
    }

    if (roadmapsRef.current) {
      setDimensions((prev) => ({
        ...prev,
        roadmaps: {
          width: `${roadmapsRef.current?.offsetWidth || 0}px`,
          height: `${roadmapsRef.current?.offsetHeight || 0}px`,
        },
      }))
    }
  }

  // Update dimensions on resize
  useEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-skeleton">
        <div className="dashboard-title">
          <Skeleton.Input
            active
            style={{
              width: dimensions.header.width,
              height: 40,
            }}
          />
          <Skeleton.Input
            active
            style={{
              width: "60%",
              height: 24,
              marginTop: 8,
            }}
          />
        </div>
      </div>

      <div className="dashboard-content-skeleton">
        {/* Continue Learning Section */}
        <div className="dashboard-row">
          <div className="dashboard-continue-learning-skeleton" style={{ width: "100%" }}>
            <Skeleton.Input
              active
              style={{
                width: "30%",
                height: 24,
                marginBottom: 12,
              }}
            />
            <Skeleton.Input
              active
              style={{
                width: "50%",
                height: 32,
                marginBottom: 12,
              }}
            />
            <Skeleton.Input
              active
              style={{
                width: "80%",
                height: 60,
                marginBottom: 16,
              }}
            />
            <Skeleton.Input
              active
              style={{
                width: "100%",
                height: 12,
                marginBottom: 16,
              }}
            />
            <Skeleton.Button
              active
              style={{
                width: 150,
                height: 40,
              }}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="dashboard-row">
          <div
            className="dashboard-stats-skeleton"
            style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}
          >
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="stat-card-skeleton"
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Skeleton.Avatar active size={48} shape="square" style={{ borderRadius: "0.5rem" }} />
                <div style={{ flex: 1 }}>
                  <Skeleton.Input active style={{ width: "80%", height: 24, marginBottom: 8 }} />
                  <Skeleton.Input active style={{ width: "60%", height: 16 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmaps Section */}
        <div className="dashboard-row">
          <div className="dashboard-roadmaps-skeleton" style={{ width: "100%" }}>
            <Skeleton.Input
              active
              style={{
                width: "30%",
                height: 24,
                marginBottom: 16,
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              {[1, 2].map((_, index) => (
                <div key={index} className="roadmap-card-skeleton" style={{ display: "flex", height: 120 }}>
                  <div style={{ flex: 1, padding: "1rem" }}>
                    <Skeleton.Input active style={{ width: "70%", height: 24, marginBottom: 8 }} />
                    <Skeleton.Input active style={{ width: "90%", height: 40, marginBottom: 8 }} />
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <Skeleton.Input active style={{ width: 60, height: 16 }} />
                      <Skeleton.Input active style={{ width: 60, height: 16 }} />
                    </div>
                  </div>
                  <Skeleton.Input active style={{ width: 48, height: "100%" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSkeleton

