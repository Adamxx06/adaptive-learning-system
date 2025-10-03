import { useEffect, useState } from "react";
import { getTopic, getQuiz } from "../services/api";

type Topic = {
  id: number;
  title: string;
  content: string;
  code_snippet: string;
};

type Question = {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
};

type Quiz = {
  id: number;
  topic_id: number;
  title: string;
  questions: Question[];
};

export default function TopicView({ topicId }: { topicId: number }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    setTopic(null);
    setQuiz(null);
    setUserAnswers({});
    setScore(null);
    setAttempts(0);
    setWrongQuestions([]);

    async function fetchTopicAndQuiz() {
      try {
        const data = await getTopic(topicId);
        setTopic(data);

        const quizData = await getQuiz(topicId);

        if (quizData && Array.isArray(quizData.questions)) {
          setQuiz(quizData);
        } else {
          setQuiz({ id: 0, topic_id: topicId, title: "No Quiz", questions: [] });
        }
      } catch (err) {
        console.error("Error fetching topic or quiz:", err);
        setQuiz({ id: 0, topic_id: topicId, title: "No Quiz", questions: [] });
      }
    }

    if (topicId) fetchTopicAndQuiz();
  }, [topicId]);

  const handleSelectAnswer = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz || quiz.questions.length === 0) return;

    let correct = 0;
    const newWrongQuestions: Question[] = [];

    quiz.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correct_answer) {
        correct++;
      } else {
        newWrongQuestions.push(q);
      }
    });

    setScore(correct);
    setWrongQuestions(newWrongQuestions);
    setAttempts((prev) => prev + 1);

    // Send answers to backend
    try {
      await fetch(`http://localhost/codeadapt-backend/api/submit_answer.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic_id: topicId,
          answers: userAnswers,
        }),
      });
    } catch (err) {
      console.error(err);
    }

    if (newWrongQuestions.length > 0) {
      alert(
        `You scored ${correct}/${quiz.questions.length}. Check explanations and retry the wrong questions!`
      );
    }
  };

  const handleRetryWrong = () => {
    if (quiz) {
      setQuiz({ ...quiz, questions: wrongQuestions });
      setUserAnswers({});
      setWrongQuestions([]);
      setScore(null);
    }
  };

  if (!topic) return <div>Loading topic…</div>;

  return (
    <div>
      <h2>{topic.title}</h2>
      <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>{topic.content}</p>

      {topic.code_snippet && (
        <pre className="bg-dark text-light p-3 rounded mt-2">
          <code>{topic.code_snippet}</code>
        </pre>
      )}

      {quiz && (
        <div className="mt-5">
          <h3>{quiz.title || "Quiz"}</h3>
          <p>
            {score !== null
              ? `Your score: ${score} / ${quiz.questions.length}`
              : `Attempt: ${attempts + 1}`}
          </p>

          {quiz.questions.length > 0 ? (
            quiz.questions.map((q, i) => (
              <div key={q.id} className="mb-3">
                <p>
                  Q{i + 1}: {q.question}
                </p>
                <ul>
                  {q.options.map((opt) => {
                    const isSelected = userAnswers[q.id] === opt;
                    const showFeedback = score !== null;

                    let bgColor;
                    if (isSelected && showFeedback) {
                      bgColor = opt === q.correct_answer ? "#c8e6c9" : "#ffcdd2"; // green/red after submit
                    } else if (isSelected) {
                      bgColor = "#bbdefb"; // blue when just clicked
                    }

                    return (
                      <li
                        key={opt}
                        style={{
                          cursor: "pointer",
                          background: bgColor,
                          padding: "5px",
                          borderRadius: "4px",
                          marginBottom: "2px",
                        }}
                        onClick={() => handleSelectAnswer(q.id, opt)}
                      >
                        {opt}
                      </li>
                    );
                  })}
                </ul>
                {score !== null &&
                  userAnswers[q.id] !== q.correct_answer &&
                  q.explanation && (
                    <p style={{ color: "red", marginLeft: "10px" }}>
                      Explanation: {q.explanation}
                    </p>
                  )}
              </div>
            ))
          ) : (
            <p>No quiz available for this topic.</p>
          )}

          {quiz.questions.length > 0 && score === null && (
            <button onClick={handleSubmitQuiz}>Submit Quiz</button>
          )}
          {wrongQuestions.length > 0 && score !== null && (
            <button onClick={handleRetryWrong}>Retry Wrong Questions</button>
          )}
        </div>
      )}
    </div>
  );
}
