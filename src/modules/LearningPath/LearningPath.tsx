import {
  Background,
  BackgroundVariant,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/store";
import { fetchRoadmapById, fetchRoadmapTopic } from "./data/pathThunk";
import LoaderTopic from "./components/LoaderTopic/LoaderTopic";
import AkinatorAvatar from "../shared/components/AkinatorAvatar";

function LearningPath() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { roadmap, isTopicLoading } = useAppSelector((state) => state.roadmap);
  const { pathId } = useParams();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    (roadmap?.flowChart.nodes as any) || []
  );
  const [edges, setEdges] = useEdgesState(
    (roadmap?.flowChart.edges as any) || []
  );
  const [open, setOpen] = useState(false);

  // Transform roadmap modules for Akinator
  const getAkinatorModules = () => {
    if (!roadmap) return [];

    // Extract module information from flowChart nodes as they represent topics
    return roadmap.flowChart.nodes.map((node) => ({
      name: node.data.label,
      description: `Module: ${node.data.label}`,
    }));
  };

  useEffect(() => {
    if (pathId) {
      dispatch(fetchRoadmapById(pathId))
        .unwrap()
        .then((data) => {
          const flowchart = data.flowChart;
          setNodes(flowchart.nodes as any);
          setEdges(flowchart.edges as any);
        });
    }
  }, [pathId, dispatch]);

  if (isTopicLoading) {
    return (
      <LoaderTopic
        isLoading={isTopicLoading}
        message="Loading topic content... Please wait a moment."
      />
    );
  }

  // Only render the Akinator if we have roadmap data
  const shouldRenderAkinator = roadmap && roadmap.name && roadmap.description;

  return (
    <div className="learning-path">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) => {
          const isRemove = changes.some((change) => change.type === "remove");
          if (isRemove) return;

          onNodesChange(changes);
        }}
        onNodeClick={(_, node) => {
          if (!pathId) return;
          dispatch(
            fetchRoadmapTopic({
              roadmapId: pathId,
              id: node.id as string,
            })
          )
            .unwrap()
            .then(() => {
              navigate(`/roadmap/${pathId}/module/${node.id}`);
            });
        }}
        fitView
        nodesDraggable={false}
        draggable={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Drawer
          title="MODULE TITLE"
          placement="right"
          width={"60vw"}
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        >
          FULL CONTENT
        </Drawer>
      </ReactFlow>

      {shouldRenderAkinator && (
        <AkinatorAvatar
          roadmapName={roadmap.name}
          roadmapDescription={roadmap.description}
          modules={getAkinatorModules()}
          difficulty={"Intermediate"}
        />
      )}
    </div>
  );
}

export default LearningPath;
