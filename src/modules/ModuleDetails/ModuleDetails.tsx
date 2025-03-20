import Button from "../shared/components/Button/Button";
import ViewTitle from "../shared/components/ViewTitle/ViewTitle";
import { TrophyOutlined } from "@ant-design/icons";
import CourseProgress from "./components/CourseProgress/index";

import ScrollableCourseConcept from "./components/ScrollableCourseConcept/ScrollableCourseConcept";
import { useParams } from "../shared/hooks/useParams";
import { useAppDispatch, useAppSelector } from "../shared/store";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { fetchRoadmapTopic } from "../LearningPath/data/pathThunk";
import ModuleAdvisor from "./components/ModuleAdvisor";
import "./ModuleDetails.scss";

function ModuleDetails() {
  const { roadmap, topic } = useAppSelector((state) => state.roadmap);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { moduleId, pathId } = useParams();

  const startQuiz = () => {
    if (pathId && moduleId) {
      navigate(`/quiz/${pathId}/${moduleId}`);
    }
  };

  useEffect(() => {
    if (!topic && pathId && moduleId) {
      dispatch(fetchRoadmapTopic({ roadmapId: pathId, id: moduleId }));
    }
  }, []);

  if (!topic) return null;

  const chaptersData = topic?.chapters;

  // Prepare chapter data for the advisor
  const chaptersForAdvisor =
    chaptersData?.map((chapter) => ({
      name: chapter.name,
      description: chapter.description || "",
    })) || [];

  return (
    <div className="module-details-container">
      <ViewTitle retourUrl={`/roadmap/${pathId}`} title={topic?.name}>
        <Button
          label="Take Quiz"
          IconComponent={TrophyOutlined}
          onClick={startQuiz}
          className="quiz-button"
        />
      </ViewTitle>

      <CourseProgress
        title={roadmap?.description || ""}
        progress={topic?.progress}
        totalConcepts={topic?.chaptersCount}
        difficulty={topic?.difficulty}
      />

      <ModuleAdvisor
        topicName={topic.name}
        topicDifficulty={topic.difficulty}
        chapters={chaptersForAdvisor}
        roadmapContext={roadmap?.description}
      />

      <ScrollableCourseConcept chapters={chaptersData || []} />
    </div>
  );
}

export default ModuleDetails;
