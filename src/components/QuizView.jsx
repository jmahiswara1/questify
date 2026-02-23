import { useState, useEffect } from 'react';

function QuizView({ questions, onFinish, config }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswersData, setUserAnswersData] = useState([]);

    const currentQuestion = questions[currentIndex];
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;

    const handleAnswerSelect = (answer) => {
        if (isAnswerChecked) return;
        setSelectedAnswer(answer);
    };

    const checkAnswer = () => {
        if (!selectedAnswer) return;

        setIsAnswerChecked(true);
        const isCorrect = selectedAnswer === currentQuestion.correct_answer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setUserAnswersData(prev => [
            ...prev,
            {
                question: currentQuestion.question,
                selected: selectedAnswer,
                correct: currentQuestion.correct_answer,
                isCorrect: isCorrect
            }
        ]);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswerChecked(false);
        } else {
            onFinish(score, userAnswersData);
        }
    };

    if (!currentQuestion) return <div>Loading...</div>;

    const renderOptionBadge = (index) => {
        const letters = ['A', 'B', 'C', 'D'];
        return letters[index] || '';
    };

    return (
        <div className="w-full flex justify-center animate-fade-in-up">
            <div className="w-full max-w-[800px] flex flex-col gap-6 animate-fade-in-up">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-black tracking-tight text-zinc-dark dark:text-white drop-shadow-md">Question {currentIndex + 1} of {questions.length}</h2>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/20 dark:bg-zinc-800/40 backdrop-blur-md border border-white/30 dark:border-zinc-700/50 text-xs font-bold text-white shadow-sm uppercase tracking-wider">{config.category === 'any' ? 'Mixed' : questions[0].category.split(':')[0]}</span>
                        <span className="px-3 py-1 rounded-full bg-white/20 dark:bg-zinc-800/40 backdrop-blur-md border border-white/30 dark:border-zinc-700/50 text-xs font-bold text-white shadow-sm uppercase tracking-wider">{config.difficulty === 'any' ? 'Mixed' : config.difficulty}</span>
                    </div>
                </div>

                <div className="w-full bg-white/20 dark:bg-zinc-800/30 rounded-full h-2.5 mb-2 backdrop-blur-sm border border-white/30 dark:border-zinc-700/30 overflow-hidden shadow-inner">
                    <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(13,148,136,0.8)] relative"
                        style={{ width: `${progressPercent}%` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30"></div>
                    </div>
                </div>

                <div className="glass-card dark:glass-card-dark rounded-3xl p-6 md:p-10 shadow-glass border border-white/60 dark:border-zinc-700/60 transition-all duration-300">
                    <h3
                        className="text-2xl md:text-3xl font-bold text-zinc-dark dark:text-white leading-snug mb-8"
                        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.all_answers.map((answer, index) => {
                            const isCorrect = answer === currentQuestion.correct_answer;
                            const isSelected = answer === selectedAnswer;

                            let btnClass = "relative overflow-hidden group flex items-center p-4 rounded-xl border-2 transition-all duration-300 text-left font-semibold text-lg hover:-translate-y-1 hover:shadow-lg ";
                            let iconClass = "material-symbols-outlined text-silver dark:text-zinc-500 transition-colors group-hover:text-primary";
                            let iconName = "radio_button_unchecked";

                            if (!isAnswerChecked) {
                                if (isSelected) {
                                    btnClass += "bg-primary/10 dark:bg-primary/20 border-primary text-primary dark:text-primary-light shadow-[0_0_15px_rgba(13,148,136,0.2)] cursor-pointer ";
                                    iconClass = "material-symbols-outlined text-primary";
                                    iconName = "radio_button_checked";
                                } else {
                                    btnClass += "bg-white/50 dark:bg-zinc-800/50 border-white/60 dark:border-zinc-700/60 text-zinc-medium dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 hover:border-primary/50 dark:hover:border-primary/50 hover:text-zinc-dark dark:hover:text-white cursor-pointer ";
                                }
                            } else {
                                btnClass += "cursor-default ";
                                if (isCorrect) {
                                    btnClass += "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-800 dark:text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] ";
                                    iconClass = "material-symbols-outlined text-green-500";
                                    iconName = "check_circle";
                                } else if (isSelected && !isCorrect) {
                                    btnClass += "bg-red-100 dark:bg-red-900/40 border-red-500 text-red-800 dark:text-red-400 animate-[shake_0.5s_ease-in-out] ";
                                    iconClass = "material-symbols-outlined text-red-500";
                                    iconName = "cancel";
                                } else {
                                    btnClass += "bg-gray-100/50 dark:bg-zinc-800/30 border-gray-200 dark:border-zinc-700/50 text-gray-400 dark:text-zinc-500 opacity-60 ";
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    disabled={isAnswerChecked}
                                    onClick={() => handleAnswerSelect(answer)}
                                    className={btnClass}
                                >
                                    {!isAnswerChecked && (
                                        <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                                    )}
                                    <div className="relative z-10 flex items-center gap-4 w-full">
                                        <span className={iconClass}>{iconName}</span>
                                        <span dangerouslySetInnerHTML={{ __html: answer }} className="flex-1" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end mt-4 h-14">
                    {!isAnswerChecked && selectedAnswer ? (
                        <button
                            onClick={checkAnswer}
                            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all w-full md:w-auto justify-center"
                        >
                            Submit Answer
                        </button>
                    ) : isAnswerChecked ? (
                        <button
                            onClick={handleNext}
                            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all w-full md:w-auto justify-center animate-fade-in-up"
                        >
                            {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                    ) : null}
                </div>

            </div>
        </div>
    );
}

export default QuizView;
