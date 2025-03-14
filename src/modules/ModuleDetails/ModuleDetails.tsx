import Button from "../shared/components/Button/Button";
import ViewTitle from "../shared/components/ViewTitle/ViewTitle";
import { TrophyOutlined } from "@ant-design/icons";
import CourseProgress from "./components/CourseProgress/index";

import ScrollableCourseConcept from "./components/ScrollableCourseConcept/ScrollableCourseConcept";
import { concepts } from "./constants";
import { useParams } from "../shared/hooks/useParams";
import { setCurrentQuiz } from "../quiz/store/quizSlice";
import { useAppDispatch } from "../shared/store";
import { useNavigate } from "react-router-dom";
import { fetchQuizById } from "../quiz/api/quizApi";

function ModuleDetails() {
  const handleConceptClick = (id: number) => {
    console.log(`Concept ${id} clicked`);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { name } = useParams();

  const startQuiz = async () => {
    try {
      const quiz = await fetchQuizById("1");
      if (quiz) {
        dispatch(setCurrentQuiz(quiz));
        navigate(`/quiz/${name}`);
      }
    } catch (error) {
      console.error("Failed to start quiz:", error);
    }
  };

  return (
    <div>
      <ViewTitle retourUrl="/learning-path" title={name}>
        <Button
          label="take quiz"
          IconComponent={TrophyOutlined}
          onClick={startQuiz}
        />
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

      <ScrollableCourseConcept
        concepts={concepts}
        handleConceptClick={handleConceptClick}
      />
    </div>
  );
}

export default ModuleDetails;
