import { useState, useEffect } from 'react';
import { fetchCategories, fetchQuestions } from '../api';

function SetupView({ onStartQuiz }) {
    const [categories, setCategories] = useState([]);
    const [amount, setAmount] = useState(10);
    const [category, setCategory] = useState('any');
    const [difficulty, setDifficulty] = useState('any');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            const cats = await fetchCategories();
            setCategories(cats);
        };
        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const questions = await fetchQuestions(amount, category, difficulty);
        setIsLoading(false);

        if (questions.length > 0) {
            onStartQuiz(questions, { category, difficulty, amount });
        } else {
            alert("Tidak dapat memuat pertanyaan. Coba kurangi jumlah atau ganti kategori.");
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="text-center mb-10 max-w-2xl animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-dark dark:text-white tracking-tight mb-4 drop-shadow-sm">
                    Uji Pengetahuanmu!
                </h1>
                <p className="text-zinc-medium dark:text-zinc-400 text-lg font-medium leading-relaxed max-w-lg mx-auto">
                    Challenge yourself with thousands of questions across various topics. Customize your quiz and start learning.
                </p>
            </div>

            <div className="w-full max-w-[480px] glass-card dark:glass-card-dark rounded-2xl p-1 md:p-2 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                <div className="bg-white/50 dark:bg-zinc-800/50 rounded-xl p-6 md:p-8 flex flex-col gap-6 backdrop-blur-sm border border-white/60 dark:border-zinc-700/60">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200/60 dark:border-zinc-700/60">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-2xl">tune</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-zinc-dark dark:text-white">Setup Quiz</h3>
                            <p className="text-xs text-zinc-medium dark:text-zinc-400 font-medium">Configure your game settings</p>
                        </div>
                    </div>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-zinc-dark dark:text-white flex items-center gap-2" htmlFor="amount">
                                <span className="material-symbols-outlined text-lg text-primary">list_alt</span>
                                Number of Questions
                            </label>
                            <div className="relative">
                                <input
                                    className="glass-input dark:glass-input-dark w-full rounded-lg px-4 py-3 placeholder-silver dark:placeholder-zinc-500 focus:outline-none transition-all duration-200 font-medium"
                                    id="amount"
                                    max="50"
                                    min="1"
                                    placeholder="Enter 1-50"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 mr-7 text-primary text-xs font-bold pointer-events-none bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                                    MAX 50
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-zinc-dark dark:text-white flex items-center gap-2" htmlFor="category">
                                <span className="material-symbols-outlined text-lg text-primary">category</span>
                                Category
                            </label>
                            <select
                                className="glass-input dark:glass-input-dark w-full rounded-lg px-4 py-3 focus:outline-none transition-all duration-200 font-medium cursor-pointer"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="any">Any Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-bold text-zinc-dark dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg text-primary">signal_cellular_alt</span>
                                Difficulty
                            </label>
                            <div className="grid grid-cols-4 gap-2 p-1.5 bg-gray-100/60 dark:bg-zinc-800/60 rounded-xl border border-gray-200/60 dark:border-zinc-700/60">
                                {['any', 'easy', 'medium', 'hard'].map((level) => (
                                    <label key={level} className="cursor-pointer group relative">
                                        <input
                                            checked={difficulty === level}
                                            className="peer sr-only"
                                            name="difficulty"
                                            type="radio"
                                            value={level}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                        />
                                        <div className="flex flex-col items-center justify-center py-2.5 rounded-lg transition-all duration-200 border border-transparent bg-white/50 dark:bg-zinc-700/50 text-gray-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-600 hover:text-gray-800 dark:hover:text-white peer-checked:bg-white dark:peer-checked:bg-zinc-600 peer-checked:text-primary dark:peer-checked:text-primary peer-checked:font-bold peer-checked:shadow-sm peer-checked:border-gray-200/80 dark:peer-checked:border-zinc-500/80">
                                            <span className="text-xs uppercase">{level}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-4 group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 text-white shadow-[0_4px_14px_0_rgba(13,148,136,0.39)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:animate-shine"></div>
                            <span className="text-lg font-bold tracking-wide mr-2 relative z-10">
                                {isLoading ? 'Loading...' : 'Start Quiz'}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SetupView;
