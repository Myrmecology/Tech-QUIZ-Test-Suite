import { useState, useEffect } from 'react';
import type { Question } from '../models/Question.js';
import { getQuestions } from '../services/questionApi.js';

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomQuestions = async () => {
    try {
      console.log('Fetching questions...');
      const fetchedQuestions = await getQuestions();
      console.log('API Response:', fetchedQuestions);

      if (!fetchedQuestions || fetchedQuestions.length === 0) {
        console.error('No questions received or empty array');
        setError('No questions received from the server');
        return false;
      }

      // Check if the questions have the expected structure
      const firstQuestion = fetchedQuestions[0];
      console.log('First question structure:', firstQuestion);
      
      setQuestions(fetchedQuestions);
      return true;
    } catch (err) {
      console.error('Error in getRandomQuestions:', err);
      setError('Failed to fetch questions: ' + (err instanceof Error ? err.message : String(err)));
      return false;
    }
  };

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setQuizCompleted(false);
      setScore(0);
      setCurrentQuestionIndex(0);
      
      console.log('Starting quiz...');
      const success = await getRandomQuestions();
      console.log('Fetching questions result:', success);
      
      if (success) {
        setQuizStarted(true);
      } else {
        console.error('Failed to start quiz: getRandomQuestions returned false');
      }
    } catch (error) {
      console.error('Exception in handleStartQuiz:', error);
      setError('Error starting quiz: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary d-inline-block mx-auto" onClick={() => setError(null)}>
          Try Again
        </button>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Take New Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="alert alert-warning">No questions available. Please try again.</div>
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Retry
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log('Rendering question:', currentQuestion);

  return (
    <div className='card p-4'>
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
      {currentQuestion.answers.map((answer, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <button className="btn btn-primary" onClick={() => handleAnswerClick(answer.isCorrect)}>{index + 1}</button>
          <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">{answer.text}</div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Quiz;