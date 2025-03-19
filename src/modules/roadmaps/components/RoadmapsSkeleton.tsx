import { Skeleton } from "antd"

export default function RoadmapsSkeleton() {
  return (
    <div className="roadmaps-container">
      <div className="roadmaps-header" style={{ marginBottom: "2rem" }}>
        <Skeleton.Input
          active
          style={{
            width: "300px",
            height: "40px",
            marginBottom: "1rem",
          }}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              display: "flex",
              height: "180px",
              border: "1px solid #f3f4f6",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Skeleton.Input
                active
                style={{
                  width: "80%",
                  height: "28px",
                  marginBottom: "0.75rem",
                }}
              />
              <Skeleton.Input
                active
                style={{
                  width: "90%",
                  height: "40px",
                  marginBottom: "1rem",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                }}
              >
                <Skeleton.Input
                  active
                  style={{ width: "100px", height: "20px" }}
                />
                <Skeleton.Input
                  active
                  style={{ width: "100px", height: "20px" }}
                />
              </div>
              <Skeleton.Input
                active
                style={{ width: "80px", height: "24px" }}
              />
            </div>
            <div
              style={{
                width: "48px",
                background: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Skeleton.Avatar
                active
                size="small"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 