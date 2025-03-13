import { Quiz } from '../types/quiz.types';

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Introduction to E-Learning',
    description: 'Test your knowledge about E-Learning basics',
    questions: [
      {
        id: 'q1',
        text: 'What is the primary purpose of E-Learning?',
        type: 'single',
        timeLimit: 20,
        explanation:
          "E-Learning primarily focuses on digital education and skill development because it leverages technology to provide accessible, flexible, and scalable learning solutions. Unlike entertainment or social networking, it's specifically designed to facilitate structured learning experiences through digital platforms.",
        options: [
          {
            id: 'a1',
            text: 'Entertainment only',
            isCorrect: false,
          },
          {
            id: 'a2',
            text: 'Digital education and skill development',
            isCorrect: true,
          },
          {
            id: 'a3',
            text: 'Social networking',
            isCorrect: false,
          },
        ],
      },
      {
        id: 'q2',
        text: 'Which of these are benefits of E-Learning? (Select all that apply)',
        type: 'multiple',
        timeLimit: 20,
        explanation:
          'E-Learning offers multiple advantages: flexibility allows learners to study at their own pace and schedule; cost-effectiveness reduces expenses related to traditional learning methods; and global resource access connects learners with diverse educational materials and experts worldwide. However, an internet connection is typically required for accessing these resources.',
        options: [
          {
            id: 'a1',
            text: 'Flexibility in learning schedule',
            isCorrect: true,
          },
          {
            id: 'a2',
            text: 'Cost-effective education',
            isCorrect: true,
          },
          {
            id: 'a3',
            text: 'No need for internet connection',
            isCorrect: false,
          },
          {
            id: 'a4',
            text: 'Access to global resources',
            isCorrect: true,
          },
        ],
      },
      {
        id: 'q3',
        text: 'What makes E-Learning effective for modern education?',
        type: 'multiple',
        timeLimit: 20,
        explanation:
          'Modern E-Learning effectiveness stems from its interactive nature, personalized learning paths, and immediate feedback mechanisms. Interactive content keeps learners engaged, while multimedia elements cater to different learning styles. The ability to track progress helps learners stay motivated and allows educators to provide targeted support.',
        options: [
          {
            id: 'a1',
            text: 'Interactive content and engagement',
            isCorrect: true,
          },
          {
            id: 'a2',
            text: 'Multimedia learning materials',
            isCorrect: true,
          },
          {
            id: 'a3',
            text: 'Progress tracking and analytics',
            isCorrect: true,
          },
          {
            id: 'a4',
            text: 'Limited technology requirements',
            isCorrect: false,
          },
        ],
      },
    ],
    totalTime: 60,
    passingScore: 80,
  },
  {
    id: '2',
    title: 'Digital Learning Tools',
    description: 'Explore various digital tools used in modern education',
    questions: [
      {
        id: 'q1',
        text: 'Which tool is best for real-time collaboration?',
        type: 'single',
        timeLimit: 20,
        explanation:
          'Real-time collaboration tools like Google Workspace are essential in modern education as they enable simultaneous work on documents, immediate feedback, and seamless communication between students and teachers. These features make remote learning more interactive and efficient.',
        options: [
          {
            id: 'a1',
            text: 'Google Workspace',
            isCorrect: true,
          },
          {
            id: 'a2',
            text: 'Static PDF readers',
            isCorrect: false,
          },
          {
            id: 'a3',
            text: 'Basic text editors',
            isCorrect: false,
          },
        ],
      },
      {
        id: 'q2',
        text: 'What features are important in Learning Management Systems (LMS)?',
        type: 'multiple',
        timeLimit: 20,
        explanation:
          "Learning Management Systems are comprehensive platforms that require multiple key features to effectively support education. Content organization helps maintain structure, progress tracking enables personalized learning paths, and assessment tools provide necessary feedback. While mobile optimization is beneficial, it's not always critical for basic LMS functionality.",
        options: [
          {
            id: 'a1',
            text: 'Content organization',
            isCorrect: true,
          },
          {
            id: 'a2',
            text: 'Progress tracking',
            isCorrect: true,
          },
          {
            id: 'a3',
            text: 'Assessment tools',
            isCorrect: true,
          },
          {
            id: 'a4',
            text: 'Mobile optimization only',
            isCorrect: false,
          },
        ],
      },
    ],
    totalTime: 40,
    passingScore: 80,
  },
];

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockQuizzes), 1000);
  });
};

export const fetchQuizById = async (id: string): Promise<Quiz | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const quiz = mockQuizzes.find((q) => q.id === id);
      resolve(quiz || null);
    }, 500);
  });
};
