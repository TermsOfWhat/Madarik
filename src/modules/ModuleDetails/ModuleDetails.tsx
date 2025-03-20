import Button from '../shared/components/Button/Button';
import ViewTitle from '../shared/components/ViewTitle/ViewTitle';
import { TrophyOutlined, CheckCircleOutlined } from '@ant-design/icons';
import CourseProgress from './components/CourseProgress/index';
import { resetQuiz } from '../quiz/data/quizSlice';

import ScrollableCourseConcept from './components/ScrollableCourseConcept/ScrollableCourseConcept';
import { useParams } from '../shared/hooks/useParams';
import { useAppDispatch, useAppSelector } from '../shared/store';
import { useNavigate } from 'react-router-dom';

import { useEffect, useMemo } from 'react';
import { fetchRoadmapTopic } from '../LearningPath/data/pathThunk';
import './quiz-button.scss';

function ModuleDetails() {
  const { roadmap, topic } = useAppSelector((state) => state.roadmap);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { moduleId, pathId } = useParams();

  const startQuiz = () => {
    if (pathId && moduleId) {
      dispatch(resetQuiz());
      navigate(`/quiz/${pathId}/${moduleId}`);
    }
  };

  useEffect(() => {
    if (pathId && moduleId) {
      dispatch(fetchRoadmapTopic({ roadmapId: pathId, id: moduleId }));
    }
  }, [pathId, moduleId]);

  const chaptersData = useMemo(() => topic?.chapters || [], [topic?.chapters]);

  const isQuizCompleted = useMemo(() => {
    return topic?.progress === 100;
  }, [topic?.progress]);

  if (!topic?.chapters) return null;

  return (
    <div>
      <ViewTitle retourUrl={`/roadmap/${pathId}`} title={topic?.name}>
        <Button
          label={isQuizCompleted ? "Quiz Completed" : "Final Quiz"}
          IconComponent={isQuizCompleted ? CheckCircleOutlined : TrophyOutlined}
          onClick={startQuiz}
          className={`quiz-button ${isQuizCompleted ? 'quiz-completed' : ''}`}
          disabled={isQuizCompleted}
        />
      </ViewTitle>

      <CourseProgress
        title={roadmap?.description || ''}
        progress={topic?.progress}
        totalConcepts={topic?.chaptersCount}
        difficulty={topic?.difficulty}
      />

      <ScrollableCourseConcept chapters={chaptersData || []} />
    </div>
  );
}

export default ModuleDetails;
