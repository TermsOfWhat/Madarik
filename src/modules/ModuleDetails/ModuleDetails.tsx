import Button from "../shared/components/Button/Button";
import ViewTitle from "../shared/components/ViewTitle/ViewTitle";
import { TrophyOutlined } from "@ant-design/icons";
import CourseProgress from "./components/CourseProgress/index";

import ScrollableCourseConcept from "./components/ScrollableCourseConcept/ScrollableCourseConcept";
import { useParams } from "../shared/hooks/useParams";
import { setCurrentQuiz } from "../quiz/store/quizSlice";
import { useAppDispatch, useAppSelector } from "../shared/store";
import { useNavigate } from "react-router-dom";
import { fetchQuizById } from "../quiz/api/quizApi";
import { useEffect, useMemo } from "react";
import { fetchRoadmapTopic } from "../LearningPath/data/pathThunk";

function ModuleDetails() {
  const { roadmap, topic } = useAppSelector((state) => state.roadmap);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { moduleId, pathId } = useParams();

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

  useEffect(() => {
    if (!topic && pathId && moduleId) {
      dispatch(fetchRoadmapTopic({ roadmapId: pathId, id: moduleId }));
    }
  }, []);

  const chaptersData = useMemo(() => topic?.chapters || [], [topic?.chapters]);

  if (!topic?.chapters) return null;

  return (
    <div>
      <ViewTitle retourUrl={`/roadmap/${pathId}`} title={topic?.name}>
        <Button
          label="take quiz"
          IconComponent={TrophyOutlined}
          onClick={startQuiz}
        />
      </ViewTitle>

      <CourseProgress
        title={roadmap?.description || ""}
        progress={topic?.progress}
        totalConcepts={topic?.chaptersCount}
        difficulty={topic?.difficulty}
      />

      <ScrollableCourseConcept chapters={chaptersData || []} />
    </div>
  );
}

export default ModuleDetails;
