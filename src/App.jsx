import { useState, useEffect } from 'react';
import SetupView from './components/SetupView';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';
import './index.css';

function App() {
  const [gameState, setGameState] = useState('setup');
  const [quizConfig, setQuizConfig] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('questify-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('questify-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const startQuiz = (questions, config) => {
    setQuizQuestions(questions);
    setQuizConfig(config);
    setGameState('quiz');
    setScore(0);
    setUserAnswers([]);
  };

  const finishQuiz = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setGameState('result');
  };

  const resetQuiz = () => {
    setGameState('setup');
    setQuizConfig(null);
    setQuizQuestions([]);
    setScore(0);
    setUserAnswers([]);
  };

  return (
    <div className={`transition-colors duration-300 ${theme === 'dark' ? 'dark bg-zinc-dark' : 'bg-bg-soft'}`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] bg-blob-1 rounded-full mix-blend-multiply opacity-100 blur-3xl"></div>
        <div className="absolute bottom-[10%] -right-[5%] w-[500px] h-[500px] bg-blob-2 rounded-full mix-blend-multiply opacity-100 blur-3xl"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-white dark:bg-black opacity-40 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col w-full overflow-x-hidden">
        <header className="flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-10 lg:py-5 border-b border-gray-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="size-8 text-primary">
              <span className="material-symbols-outlined text-4xl drop-shadow-sm">diamond</span>
            </div>
            <h2 className="text-zinc-dark dark:text-white text-xl font-extrabold tracking-tight">Questify</h2>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center gap-2 overflow-hidden rounded-full h-10 px-6 bg-white/70 dark:bg-zinc-800/70 hover:bg-white dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700 text-zinc-dark dark:text-white text-sm font-semibold transition-all duration-200 group shadow-sm"
          >
            <span className="truncate">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            <span className="material-symbols-outlined text-lg text-primary">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 w-full max-w-7xl mx-auto">
          {gameState === 'setup' && <SetupView onStartQuiz={startQuiz} />}
          {gameState === 'quiz' && (
            <QuizView
              questions={quizQuestions}
              onFinish={finishQuiz}
              config={quizConfig}
            />
          )}
          {gameState === 'result' && (
            <ResultView
              score={score}
              total={quizQuestions.length}
              userAnswers={userAnswers}
              questions={quizQuestions}
              onReset={resetQuiz}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
