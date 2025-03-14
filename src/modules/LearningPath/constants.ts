export const nodes = [
  {
    id: "1",
    type: "maintopic",
    position: {
      x: 500,
      y: 100,
    },
    data: {
      label: "Introduction to React",
    },
    style: {
      backgroundColor: null,
      border: "1px solid #3887d9",
      color: "#3887d9",
    },
  },
  {
    id: "2",
    type: "subtopic",
    position: {
      x: 700,
      y: 75,
    },
    data: {
      label: "JSX Basics",
    },
    style: null,
  },
  {
    id: "3",
    type: "subtopic",
    position: {
      x: 700,
      y: 125,
    },
    data: {
      label: "Virtual DOM",
    },
    style: null,
  },
  {
    id: "4",
    type: "subtopic",
    position: {
      x: 700,
      y: 175,
    },
    data: {
      label: "React Elements",
    },
    style: null,
  },
  {
    id: "5",
    type: "maintopic",
    position: {
      x: 500,
      y: 250,
    },
    data: {
      label: "Components in React",
    },
    style: {
      backgroundColor: null,
      border: "1px solid #3887d9",
      color: "#3887d9",
    },
  },
  {
    id: "6",
    type: "subtopic",
    position: {
      x: 300,
      y: 225,
    },
    data: {
      label: "Functional Components",
    },
    style: null,
  },
  {
    id: "7",
    type: "subtopic",
    position: {
      x: 300,
      y: 275,
    },
    data: {
      label: "Class Components",
    },
    style: null,
  },
  {
    id: "8",
    type: "maintopic",
    position: {
      x: 500,
      y: 400,
    },
    data: {
      label: "State and Props",
    },
    style: {
      backgroundColor: null,
      border: "1px solid #3887d9",
      color: "#3887d9",
    },
  },
  {
    id: "9",
    type: "subtopic",
    position: {
      x: 700,
      y: 375,
    },
    data: {
      label: "State Management",
    },
    style: null,
  },
  {
    id: "10",
    type: "subtopic",
    position: {
      x: 700,
      y: 425,
    },
    data: {
      label: "Props and Prop Types",
    },
    style: null,
  },
  {
    id: "11",
    type: "maintopic",
    position: {
      x: 500,
      y: 550,
    },
    data: {
      label: "Lifecycle Methods",
    },
    style: {
      backgroundColor: null,
      border: "1px solid #3887d9",
      color: "#3887d9",
    },
  },
  {
    id: "12",
    type: "subtopic",
    position: {
      x: 300,
      y: 525,
    },
    data: {
      label: "Mounting Phase",
    },
    style: null,
  },
  {
    id: "13",
    type: "subtopic",
    position: {
      x: 300,
      y: 575,
    },
    data: {
      label: "Updating Phase",
    },
    style: null,
  },
  {
    id: "14",
    type: "subtopic",
    position: {
      x: 300,
      y: 625,
    },
    data: {
      label: "Unmounting Phase",
    },
    style: null,
  },
  {
    id: "15",
    type: "maintopic",
    position: {
      x: 500,
      y: 700,
    },
    data: {
      label: "React Routing",
    },
    style: {
      backgroundColor: null,
      border: "1px solid #3887d9",
      color: "#3887d9",
    },
  },
  {
    id: "16",
    type: "subtopic",
    position: {
      x: 700,
      y: 675,
    },
    data: {
      label: "Introduction to React Router",
    },
    style: null,
  },
  {
    id: "17",
    type: "subtopic",
    position: {
      x: 700,
      y: 725,
    },
    data: {
      label: "Nested Routes",
    },
    style: null,
  },
  {
    id: "18",
    type: "maintopic",
    position: {
      x: 500,
      y: 850,
    },
    data: {
      label: "State Management with Redux",
    },
    style: {
      backgroundColor: null,
      border: "1px solid #3887d9",
      color: "#3887d9",
    },
  },
  {
    id: "19",
    type: "subtopic",
    position: {
      x: 300,
      y: 825,
    },
    data: {
      label: "Redux Basics",
    },
    style: null,
  },
  {
    id: "20",
    type: "subtopic",
    position: {
      x: 300,
      y: 875,
    },
    data: {
      label: "Connecting React to Redux",
    },
    style: null,
  },
  {
    id: "21",
    type: "maintopic",
    position: {
      x: 500,
      y: 1000,
    },
    data: {
      label: "Advanced React Patterns",
    },
    style: {
      backgroundColor: null,
      border: "1px solid #3887d9",
      color: "#3887d9",
    },
  },
  {
    id: "22",
    type: "subtopic",
    position: {
      x: 700,
      y: 975,
    },
    data: {
      label: "Higher-Order Components",
    },
    style: null,
  },
  {
    id: "23",
    type: "subtopic",
    position: {
      x: 700,
      y: 1025,
    },
    data: {
      label: "Render Props",
    },
    style: null,
  },
  {
    id: "24",
    type: "maintopic",
    position: {
      x: 500,
      y: 1150,
    },
    data: {
      label: "Best Practices",
    },
    style: {
      backgroundColor: null,
      border: "1px solid #3887d9",
      color: "#3887d9",
    },
  },
  {
    id: "25",
    type: "subtopic",
    position: {
      x: 300,
      y: 1125,
    },
    data: {
      label: "Code Organization",
    },
    style: null,
  },
  {
    id: "26",
    type: "subtopic",
    position: {
      x: 300,
      y: 1175,
    },
    data: {
      label: "Performance Optimization",
    },
    style: null,
  },
];

export const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e1-5",
    source: "1",
    target: "5",
    type: "straight",
    animated: false,
    style: null,
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e5-8",
    source: "5",
    target: "8",
    type: "straight",
    animated: false,
    style: null,
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e8-10",
    source: "8",
    target: "10",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e8-11",
    source: "8",
    target: "11",
    type: "straight",
    animated: false,
    style: null,
  },
  {
    id: "e11-12",
    source: "11",
    target: "12",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e11-13",
    source: "11",
    target: "13",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e11-14",
    source: "11",
    target: "14",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e11-15",
    source: "11",
    target: "15",
    type: "straight",
    animated: false,
    style: null,
  },
  {
    id: "e15-16",
    source: "15",
    target: "16",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e15-17",
    source: "15",
    target: "17",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e15-18",
    source: "15",
    target: "18",
    type: "straight",
    animated: false,
    style: null,
  },
  {
    id: "e18-19",
    source: "18",
    target: "19",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e18-20",
    source: "18",
    target: "20",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e18-21",
    source: "18",
    target: "21",
    type: "straight",
    animated: false,
    style: null,
  },
  {
    id: "e21-22",
    source: "21",
    target: "22",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e21-23",
    source: "21",
    target: "23",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e21-24",
    source: "21",
    target: "24",
    type: "straight",
    animated: false,
    style: null,
  },
  {
    id: "e24-25",
    source: "24",
    target: "25",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e24-26",
    source: "24",
    target: "26",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
];
