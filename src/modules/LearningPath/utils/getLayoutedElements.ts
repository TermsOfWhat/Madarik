import Dagre from "@dagrejs/dagre";

const NODE_WIDTH = 150;
const NODE_HEIGHT = 80;

export const getLayoutedElements = (nodes: any, edges: any, options: any) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge: any) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: any) => {
    return g.setNode(node.id, {
      ...node,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  Dagre.layout(g);

  return {
    nodes: nodes.map((node: any) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - NODE_WIDTH / 2;
      const y = position.y - NODE_HEIGHT / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
