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
import { nodes as initialNodes, edges as initialEdges } from "./Constants";

function LearningPath() {
  // const layouted = getLayoutedElements(initialNodes, initialEdges, {
  //   direction: "TB",
  // });

  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
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
        // onNodeClick={(_, node) => {
        //   if (node.data.type === "main") {
        //     setOpen(true);
        //   }
        // }}
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
