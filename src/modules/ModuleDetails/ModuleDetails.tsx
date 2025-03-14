import Button from "../shared/components/Button/Button";
import ViewTitle from "../shared/components/ViewTitle/ViewTitle";
import { TrophyOutlined } from "@ant-design/icons";
import CourseProgress from "./components/CourseProgress/index";
import CourseConcept from "./components/CourseConcept/index";
import styles from "./ModuleDetails.module.scss";

function ModuleDetails() {
  // Sample concepts data
  const concepts = [
    {
      id: 1,
      title: "Local vs Global State",
      description:
        "Understanding when to use component state versus global state management solutions. Local state is perfect for component-specific data, while global state is ideal for sharing data across multiple components.",
      status: "completed",
      recommendedReadings: [
        {
          id: 1,
          title: "A Complete Guide to React State Management",
          author: "LogRocket",
          readTime: 12,
          url: "https://blog.logrocket.com/react-state-management-2021/",
        },
        {
          id: 2,
          title: "When to Choose Local vs Global State in React",
          author: "Kent C. Dodds",
          readTime: 8,
          url: "https://kentcdodds.com/blog/application-state-management-with-react",
        },
      ],
    },
    {
      id: 2,
      title: "Redux Core Concepts",
      description:
        "Learn about actions, reducers, and the store. Understand how unidirectional data flow works and why it's beneficial for large applications.",
      status: "active",
      recommendedReadings: [
        {
          id: 3,
          title: "Redux Fundamentals",
          author: "Redux Team",
          readTime: 15,
          url: "https://redux.js.org/tutorials/fundamentals/part-1-overview",
        },
        {
          id: 4,
          title: "Understanding Redux: The World's Easiest Guide",
          author: "Ohans Emmanuel",
          readTime: 10,
          url: "https://medium.com/@ohansemmanuel/redux-the-worlds-easiest-guide-3b10c65a8fd5",
        },
      ],
    },
    {
      id: 3,
      title: "Context API & useContext",
      description:
        "Explore React's built-in state management solution for passing data through the component tree without prop drilling.",
      status: "locked",
      recommendedReadings: [],
    },
    {
      id: 4,
      title: "State Management Libraries Comparison",
      description:
        "Compare popular state management libraries and understand their pros and cons for different use cases.",
      status: "locked",
      recommendedReadings: [],
    },
  ];

  const handleConceptClick = (id: number) => {
    console.log(`Concept ${id} clicked`);
  };

  return (
    <div>
      <ViewTitle retourUrl="/learning-path" title={"Devops"}>
        <Button label="take quiz" IconComponent={TrophyOutlined} />
      </ViewTitle>

      <CourseProgress
        title="Master modern state management techniques in React applications, from local state to global solutions."
        progress={50}
        lastAccessed="2 days ago"
        remainingConcepts={3}
        totalConcepts={4}
        estimatedTime="2.5 hours"
        difficulty="Intermediate"
        achievements={2}
      />

      <div className={styles.conceptsContainer}>
        {concepts.map((concept) => (
          <CourseConcept
            key={concept.id}
            title={concept.title}
            description={concept.description}
            status={concept.status as "completed" | "active" | "locked"}
            onClick={() => handleConceptClick(concept.id)}
            recommendedReadings={concept.recommendedReadings}
          />
        ))}
      </div>
    </div>
  );
}

export default ModuleDetails;
