import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchQuizzes } from '../../api/quizApi';
import { setQuizzes } from '../../store/quizSlice';
import { selectQuizzes } from '../../store/quizSelectors';
import { useAppDispatch } from '@src/modules/shared/store';
const QuizListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector(selectQuizzes);

  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await fetchQuizzes();
      dispatch(setQuizzes(data));
    };
    loadQuizzes();
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Quizzes</h1>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3 }}
        dataSource={quizzes}
        renderItem={(quiz: any) => (
          <List.Item>
            <Card
              hoverable
              className="h-full"
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              <h2 className="text-lg font-semibold mb-2">{quiz.title}</h2>
              <p className="text-gray-600">{quiz.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                {quiz.questions.length} questions · {quiz.totalTime} minutes
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuizListPage;
