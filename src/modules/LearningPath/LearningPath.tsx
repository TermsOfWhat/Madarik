import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { getLayoutedElements } from "./utils/getLayoutedElements";
import { Drawer } from "antd";
import { useState } from "react";

function LearningPath() {
  const layouted = getLayoutedElements(initialNodes, initialEdges, {
    direction: "TB",
  });

  const [nodes, _, onNodesChange] = useNodesState(layouted.nodes);
  const [edges] = useEdgesState(layouted.edges);
  const [open, setOpen] = useState(false);

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
          if (node.data.type === "main") {
            setOpen(true);
          }
        }}
        fitView
      >
        <Controls />
        <MiniMap />
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
    </div>
  );
}

export default LearningPath;

const initialNodes = [
  {
    id: "1",
    data: { label: "React" },
    style: {
      backgroundColor: "#F7FBFF",
      border: "1px solid #3887D9",
      color: "#3887D9",
    },
  },
  {
    id: "2",
    data: { label: "State", type: "main" },
  },
  { id: "3", data: { label: "Props" } },
  { id: "4", data: { label: "Hooks" } },
  { id: "5", data: { label: "Context" } },
  { id: "6", data: { label: "Effect" } },
  { id: "7", data: { label: "Memo" } },
  { id: "8", data: { label: "Ref" } },
  // New nodes 9-38
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 9}`,
    data: { label: `${i + 9}` },
    style:
      i % 3 === 0
        ? {
            backgroundColor: "#F5F5F5",
            border: "1px solid #666",
            color: "#333",
          }
        : {},
  })),
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "1", target: "3" },
  { id: "e3-4", source: "1", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e4-6", source: "4", target: "6" },
  { id: "e4-7", source: "4", target: "7" },
  { id: "e3-8", source: "3", target: "8", animated: true },
  { id: "e8-9", source: "8", target: "9", animated: true },
  { id: "e9-10", source: "9", target: "10" },
  { id: "e10-11", source: "10", target: "11", animated: true },
  { id: "e11-12", source: "10", target: "12" },
  { id: "e12-13", source: "10", target: "13" },
  { id: "e13-14", source: "3", target: "14" },
  { id: "e14-15", source: "10", target: "15" },
  { id: "e15-16", source: "10", target: "16" },
  { id: "e16-17", source: "1", target: "17", animated: true },
  { id: "e17-18", source: "8", target: "18" },
];
