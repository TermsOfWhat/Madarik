import Button from "../shared/components/Button/Button";
import ViewTitle from "../shared/components/ViewTitle/ViewTitle";
import { TrophyOutlined } from "@ant-design/icons";
import CourseProgress from "./components/CourseProgress/index";

import ScrollableCourseConcept from "./components/ScrollableCourseConcept/ScrollableCourseConcept";
import { useParams } from "../shared/hooks/useParams";
import { useAppDispatch, useAppSelector } from "../shared/store";
import { useNavigate } from "react-router-dom";

import { useEffect, useMemo } from "react";
import { fetchRoadmapTopic } from "../LearningPath/data/pathThunk";

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
        progress={50}
        lastAccessed="2 days ago"
        remainingConcepts={3}
        totalConcepts={4}
        difficulty="Intermediate"
      />

      <ScrollableCourseConcept chapters={chaptersData || []} />
    </div>
  );
}

export default ModuleDetails;
