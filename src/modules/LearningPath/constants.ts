export const nodes = [
  {
    id: "1",
    type: "mainTopic",
    position: {
      x: 500,
      y: 50,
    },
    data: {
      label: "Introduction to DevOps",
    },
    style: {
      backgroundColor: "#F7FBFF",
      border: "1px solid #3887D9",
      color: "#3887D9",
    },
  },
  {
    id: "2",
    type: "subTopic",
    position: {
      x: 400,
      y: 100,
    },
    data: {
      label: "DevOps Basics",
    },
  },
  {
    id: "3",
    type: "subTopic",
    position: {
      x: 600,
      y: 100,
    },
    data: {
      label: "DevOps Tools Overview",
    },
  },
  {
    id: "4",
    type: "mainTopic",
    position: {
      x: 500,
      y: 200,
    },
    data: {
      label: "Infrastructure as Code (IaC)",
    },
    style: {
      backgroundColor: "#F7FBFF",
      border: "1px solid #3887D9",
      color: "#3887D9",
    },
  },
  {
    id: "5",
    type: "subTopic",
    position: {
      x: 400,
      y: 250,
    },
    data: {
      label: "Terraform",
    },
  },
  {
    id: "6",
    type: "subTopic",
    position: {
      x: 600,
      y: 250,
    },
    data: {
      label: "AWS CloudFormation",
    },
  },
  {
    id: "7",
    type: "mainTopic",
    position: {
      x: 500,
      y: 350,
    },
    data: {
      label: "Continuous Integration & Delivery (CI/CD)",
    },
    style: {
      backgroundColor: "#F7FBFF",
      border: "1px solid #3887D9",
      color: "#3887D9",
    },
  },
  {
    id: "8",
    type: "subTopic",
    position: {
      x: 350,
      y: 400,
    },
    data: {
      label: "Jenkins",
    },
  },
  {
    id: "9",
    type: "subTopic",
    position: {
      x: 650,
      y: 400,
    },
    data: {
      label: "GitLab CI/CD",
    },
  },
  {
    id: "10",
    type: "subTopic",
    position: {
      x: 500,
      y: 450,
    },
    data: {
      label: "GitHub Actions",
    },
  },
  {
    id: "11",
    type: "mainTopic",
    position: {
      x: 500,
      y: 500,
    },
    data: {
      label: "Monitoring & Logging",
    },
    style: {
      backgroundColor: "#F7FBFF",
      border: "1px solid #3887D9",
      color: "#3887D9",
    },
  },
  {
    id: "12",
    type: "subTopic",
    position: {
      x: 400,
      y: 550,
    },
    data: {
      label: "Prometheus",
    },
  },
  {
    id: "13",
    type: "subTopic",
    position: {
      x: 600,
      y: 550,
    },
    data: {
      label: "Grafana",
    },
  },
  {
    id: "14",
    type: "subTopic",
    position: {
      x: 500,
      y: 600,
    },
    data: {
      label: "ELK Stack",
    },
  },
  {
    id: "15",
    type: "mainTopic",
    position: {
      x: 500,
      y: 650,
    },
    data: {
      label: "Security in DevOps",
    },
    style: {
      backgroundColor: "#F7FBFF",
      border: "1px solid #3887D9",
      color: "#3887D9",
    },
  },
  {
    id: "16",
    type: "subTopic",
    position: {
      x: 400,
      y: 700,
    },
    data: {
      label: "Infrastructure Security",
    },
  },
  {
    id: "17",
    type: "subTopic",
    position: {
      x: 600,
      y: 700,
    },
    data: {
      label: "Compliance & Auditing",
    },
  },
  {
    id: "18",
    type: "mainTopic",
    position: {
      x: 500,
      y: 800,
    },
    data: {
      label: "Advanced Topics",
    },
    style: {
      backgroundColor: "#F7FBFF",
      border: "1px solid #3887D9",
      color: "#3887D9",
    },
  },
  {
    id: "19",
    type: "subTopic",
    position: {
      x: 400,
      y: 850,
    },
    data: {
      label: "GitOps",
    },
  },
  {
    id: "20",
    type: "subTopic",
    position: {
      x: 600,
      y: 850,
    },
    data: {
      label: "AIOps",
    },
  },
  {
    id: "21",
    type: "subTopic",
    position: {
      x: 500,
      y: 900,
    },
    data: {
      label: "Edge Computing",
    },
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
    type: "straight",
    animated: false,
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e4-7",
    source: "4",
    target: "7",
    type: "straight",
    animated: false,
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e7-9",
    source: "7",
    target: "9",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e7-10",
    source: "7",
    target: "10",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
  {
    id: "e7-11",
    source: "7",
    target: "11",
    type: "straight",
    animated: false,
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
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6366f1",
    },
  },
];
