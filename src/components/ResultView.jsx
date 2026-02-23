import { useState } from 'react';

function ResultView({ score, total, userAnswers, onReset }) {
    const [showReview, setShowReview] = useState(false);

    const percentage = Math.round((score / total) * 100) || 0;
    const incorrect = total - score;

    let resultMessage = "Coba lagi!";
    if (percentage >= 80) resultMessage = "Luar Biasa!";
    else if (percentage >= 50) resultMessage = "Bagus Sekali!";

    return (
        <div className="w-full max-w-[960px] flex flex-col gap-8 animate-fade-in-up">
            {percentage >= 80 && (
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-60">
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                </div>
            )}

            <section className="relative overflow-hidden rounded-3xl glass-card dark:glass-card-dark border-white/50 dark:border-zinc-700/50 shadow-glass">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8 md:gap-16">
                    <div className="relative flex items-center justify-center shrink-0">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-40"></div>
                        <div className="relative size-48 md:size-56">
                            <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
                                <circle className="text-gray-200 dark:text-zinc-700" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
                                <circle
                                    className="text-primary drop-shadow-sm transition-all duration-1000 ease-out"
                                    cx="50" cy="50" fill="transparent" r="42" stroke="currentColor"
                                    strokeDasharray="264"
                                    strokeDashoffset={264 - (264 * percentage) / 100}
                                    strokeLinecap="round" strokeWidth="8"
                                ></circle>
                            </svg>
                            <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center text-center">
                                <span className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">{percentage}%</span>
                                <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wide">Score</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 flex-1">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">{resultMessage}</h1>
                            <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed font-medium">
                                You answered <span className="text-primary font-bold">{score}</span> out of <span className="text-zinc-900 dark:text-white font-bold">{total}</span> questions correctly.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 w-full justify-center md:justify-start pt-2 relative z-20">
                            <button
                                onClick={onReset}
                                className="group flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined">replay</span>
                                Main Lagi
                            </button>
                            <button
                                onClick={onReset}
                                className="flex items-center gap-2 px-8 py-3.5 bg-white/70 dark:bg-zinc-800/70 hover:bg-white dark:hover:bg-zinc-700 border border-white/50 dark:border-zinc-600/50 text-zinc-900 dark:text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined text-primary">add_circle</span>
                                Kuis Baru
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                <div className="flex items-center gap-5 p-6 rounded-2xl glass-card dark:glass-card-dark border-white/50 dark:border-zinc-700/50 shadow-sm">
                    <div className="flex items-center justify-center size-14 rounded-full bg-green-100/50 text-green-600 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                        <span className="material-symbols-outlined text-3xl">check_circle</span>
                    </div>
                    <div>
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Correct</p>
                        <div className="flex items-baseline gap-3">
                            <p className="text-3xl font-black text-zinc-900 dark:text-white">{score}</p>
                            <span className="text-green-600 dark:text-green-400 text-xs font-bold bg-green-100/50 dark:bg-green-900/40 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800/50">+{percentage}%</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-5 p-6 rounded-2xl glass-card dark:glass-card-dark border-white/50 dark:border-zinc-700/50 shadow-sm">
                    <div className="flex items-center justify-center size-14 rounded-full bg-red-100/50 text-red-500 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
                        <span className="material-symbols-outlined text-3xl">cancel</span>
                    </div>
                    <div>
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Incorrect</p>
                        <div className="flex items-baseline gap-3">
                            <p className="text-3xl font-black text-zinc-900 dark:text-white">{incorrect}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 pt-4 pb-12 relative z-10">
                <div className="flex items-center justify-between px-2 cursor-pointer group" onClick={() => setShowReview(!showReview)}>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Review Answers</h2>
                    <button className="text-primary hover:text-primary-dark text-sm font-bold flex items-center gap-1 transition-colors">
                        {showReview ? 'Hide Report' : 'View Full Report'}
                        <span className={`material-symbols-outlined text-lg transition-transform ${showReview ? 'rotate-90' : 'group-hover:translate-x-1'}`}>
                            arrow_forward
                        </span>
                    </button>
                </div>

                {showReview && (
                    <div className="space-y-4 animate-fade-in-up">
                        {userAnswers.map((item, index) => (
                            <div key={index} className="group flex flex-col md:flex-row gap-5 p-5 rounded-2xl glass-card dark:glass-card-dark border-white/50 dark:border-zinc-700/50 hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all duration-300">
                                <div className="shrink-0 pt-1">
                                    {item.isCorrect ? (
                                        <div className="flex items-center justify-center size-10 rounded-full bg-green-100/50 text-green-600 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                            <span className="material-symbols-outlined">check</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center size-10 rounded-full bg-red-100/50 text-red-500 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
                                            <span className="material-symbols-outlined">close</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 space-y-2">
                                    <h3 className="text-zinc-900 dark:text-white text-lg font-bold leading-snug" dangerouslySetInnerHTML={{ __html: item.question }} />
                                    <div className="flex flex-col sm:flex-row gap-3 text-sm mt-2">
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit ${item.isCorrect ? 'bg-green-100/30 border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400' : 'bg-red-100/30 border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400'}`}>
                                            <span className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Your Answer:</span>
                                            <span className={`font-bold ${!item.isCorrect ? 'line-through opacity-80' : ''}`} dangerouslySetInnerHTML={{ __html: item.selected || 'Unanswered' }} />
                                        </div>

                                        {!item.isCorrect && (
                                            <>
                                                <div className="hidden sm:flex items-center text-silver/50 dark:text-zinc-700">|</div>
                                                <div className="flex items-center gap-2 py-1.5 text-zinc-900 dark:text-zinc-300">
                                                    <span className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Correct:</span>
                                                    <span className="font-semibold text-green-600 dark:text-green-400" dangerouslySetInnerHTML={{ __html: item.correct }} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResultView;
