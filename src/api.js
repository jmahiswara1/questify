export const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const fetchCategories = async () => {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchQuestions = async (amount, category, difficulty) => {
  try {
    let url = `https://opentdb.com/api.php?amount=${amount}`;
    
    if (category && category !== "any") {
      url += `&category=${category}`;
    }
    
    if (difficulty && difficulty !== "any") {
      url += `&difficulty=${difficulty}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch questions");
    
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error(`API returned response code: ${data.response_code}`);
    }

    return data.results.map((q) => {
      const decodedQuestion = decodeHTML(q.question);
      const decodedCorrectAnswer = decodeHTML(q.correct_answer);
      const decodedIncorrectAnswers = q.incorrect_answers.map(decodeHTML);

      const allAnswers = [...decodedIncorrectAnswers, decodedCorrectAnswer].sort(() => Math.random() - 0.5);

      return {
        ...q,
        question: decodedQuestion,
        correct_answer: decodedCorrectAnswer,
        incorrect_answers: decodedIncorrectAnswers,
        all_answers: allAnswers,
      };
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
