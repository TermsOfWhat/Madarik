import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentQuiz } from '@src/modules/quiz/store/quizSlice';
import { fetchQuizById } from '@src/modules/quiz/api/quizApi';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startQuiz = async () => {
    try {
      const quiz = await fetchQuizById('1');
      if (quiz) {
        dispatch(setCurrentQuiz(quiz));
        navigate('/quiz/1');
      }
    } catch (error) {
      console.error('Failed to start quiz:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <Button
        type="primary"
        size="large"
        onClick={startQuiz}
        className="start-quiz-btn"
      >
        Start Quiz
      </Button>
    </div>
  );
}

export default Dashboard;
