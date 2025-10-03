import React, { useEffect, useState } from "react";
import { getQuiz } from "../services/api";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
}

interface QuizSectionProps {
  topicId: number;
  userId: number;
}

const QuizSection: React.FC<QuizSectionProps> = ({ topicId, userId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [topicId]);

  async function loadQuiz() {
    setLoading(true);
    try {
      const data = await getQuiz(topicId);
      setQuestions(data);
      setAnswers({});
      setScore(null);
    } catch (err) {
      console.error("Failed to load quiz:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(qid: number, option: string) {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  }

  async function handleSubmit() {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) correct++;
    });
    setScore(correct);

    if (correct >= 4) {
      // ✅ Call backend to save progress
      await fetch("http://localhost/codeadapt-backend/api/submit_answer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          topic_id: topicId,
          score: correct,
        }),
      });
    } else {
      // 🔄 Reload new quiz if score is too low
      loadQuiz();
    }
  }

  if (loading) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-section">
      <h3>Topic Quiz</h3>
      {questions.map((q) => (
        <div key={q.id} className="quiz-question">
          <p>{q.question}</p>
          {q.options.map((opt) => (
            <label key={opt} style={{ display: "block" }}>
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleAnswer(q.id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
      {score !== null && <p>Your score: {score}/{questions.length}</p>}
    </div>
  );
};

export default QuizSection;
