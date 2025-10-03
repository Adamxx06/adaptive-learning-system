import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  points: number;
}

interface Quiz {
  id: number;
  topic_id: number;
  title: string;
  questions: Question[];
}

const QuizPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!topicId) return;

    fetch(`http://localhost/codeadapt-backend/api/get_quiz.php?topic_id=${topicId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          // Parse options JSON into arrays
          const questions = data.questions.map((q: any) => ({
            ...q,
            options: JSON.parse(q.options)
          }));
          setQuiz({ ...data, questions });
        }
      })
      .catch(err => setError(err.message));
  }, [topicId]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{quiz.title || "Quiz"}</h1>
      {quiz.questions.map((q, i) => (
        <div key={q.id} className="mb-6 p-4 border rounded-lg">
          <h2 className="font-semibold">Q{i + 1}: {q.question}</h2>
          <ul className="mt-2 space-y-2">
            {q.options.map((opt, idx) => (
              <li
                key={idx}
                className="p-2 border rounded cursor-pointer hover:bg-gray-100"
              >
                {opt}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-gray-600"><strong>Explanation:</strong> {q.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizPage;
