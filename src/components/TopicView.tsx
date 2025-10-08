import { useEffect, useState } from "react";
import { getTopic, getQuiz } from "../services/api";

type Topic = {
  id: number;
  title: string;
  content: string;
  code_snippet?: string;
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
  const [originalQuestions, setOriginalQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    // reset state whenever topicId changes
    setTopic(null);
    setQuiz(null);
    setUserAnswers({});
    setScore(null);
    setAttempts(0);
    setWrongQuestions([]);
    setOriginalQuestions([]);

    async function fetchTopicAndQuiz() {
      try {
        const data = await getTopic(topicId);
        if (!cancelled) setTopic(data);

        const quizData = await getQuiz(topicId);
        if (!cancelled) {
          if (quizData && Array.isArray(quizData.questions)) {
            setQuiz(quizData);
            setOriginalQuestions(quizData.questions);
          } else {
            setQuiz({ id: 0, topic_id: topicId, title: "No Quiz Available", questions: [] });
            setOriginalQuestions([]);
          }
        }
      } catch (err) {
        console.error("Error fetching topic or quiz:", err);
        if (!cancelled) {
          setQuiz({ id: 0, topic_id: topicId, title: "No Quiz Available", questions: [] });
          setOriginalQuestions([]);
        }
      }
    }

    if (topicId) fetchTopicAndQuiz();

    return () => {
      cancelled = true;
    };
  }, [topicId]);

  const handleSelectAnswer = (questionId: number, answer: string) => {
    if (score === null) {
      setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
    }
  };

  const handleSubmitQuiz = () => {
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
  };

  const handleRetryWrong = () => {
    if (wrongQuestions.length > 0) {
      setQuiz((prevQuiz) => (prevQuiz ? { ...prevQuiz, questions: wrongQuestions } : null));
      setUserAnswers({});
      setWrongQuestions([]);
      setScore(null);
    }
  };

  const handleRetryFullQuiz = () => {
    setQuiz((prevQuiz) => (prevQuiz ? { ...prevQuiz, questions: originalQuestions } : null));
    setUserAnswers({});
    setWrongQuestions([]);
    setScore(null);
    setAttempts(0);
  };

  if (!topic) return <div className="p-4 text-center text-muted">Loading topic…</div>;

  return (
    <div className="topic-view">
      <h1 className="display-4 fw-bolder mb-4 text-dark">{topic.title}</h1>

      <section className="mb-5 p-4 bg-white rounded shadow-sm border">
        <h2 className="h4 text-primary mb-3">Topic Overview</h2>
        <p style={{ whiteSpace: "pre-line", lineHeight: 1.8, fontSize: "1.05rem", color: "#333" }}>
          {topic.content}
        </p>
      </section>

      {topic.code_snippet && (
        <section className="mb-5">
          <h2 className="h4 text-secondary mb-3">Code Example</h2>
          <pre className="p-4 rounded bg-dark text-light shadow-lg" style={{ overflowX: "auto", fontSize: "0.95rem", border: "none" }}>
            <code>{topic.code_snippet}</code>
          </pre>
        </section>
      )}

      {quiz && (
        <section className="mt-5 card shadow-lg border-0">
          <div className="card-header bg-primary text-white py-3">
            <h3 className="h4 mb-0">{quiz.title || "Knowledge Check Quiz"}</h3>
          </div>

          <div className="card-body p-4 p-lg-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fw-bold mb-0">{score !== null ? `Final Score: ${score} / ${quiz.questions.length}` : `Attempt: ${attempts + 1}`}</p>
              {score !== null && (
                <>
                  {wrongQuestions.length > 0 && (
                    <button onClick={handleRetryWrong} className="btn btn-outline-warning btn-sm fw-bold me-2">
                      <i className="bi bi-arrow-repeat me-1"></i> Retry Wrong ({wrongQuestions.length})
                    </button>
                  )}
                  <button onClick={handleRetryFullQuiz} className="btn btn-outline-primary btn-sm fw-bold">
                    <i className="bi bi-arrow-repeat me-1"></i> Retry Full Quiz
                  </button>
                </>
              )}
            </div>

            {quiz.questions.length > 0 ? (
              quiz.questions.map((q, i) => {
                const isCorrect = userAnswers[q.id] === q.correct_answer;
                const showFeedback = score !== null;

                return (
                  <div key={q.id} className="mb-4 p-3 border rounded bg-light">
                    <p className="fw-semibold mb-3">
                      <span className="badge bg-primary me-2">Q{i + 1}</span>
                      {q.question}
                    </p>

                    <div className="d-grid gap-2">
                      {q.options.map((opt) => {
                        const isSelected = userAnswers[q.id] === opt;
                        let btnClass = "btn btn-light text-start border";

                        if (showFeedback) {
                          if (opt === q.correct_answer) {
                            btnClass = "btn btn-success text-white text-start shadow-sm fw-bold";
                          } else if (isSelected) {
                            btnClass = "btn btn-danger text-white text-start shadow-sm";
                          } else {
                            btnClass = "btn btn-outline-secondary text-start";
                          }
                        } else if (isSelected) {
                          btnClass = "btn btn-info text-white text-start shadow-sm";
                        }

                        return (
                          <button
                            key={opt}
                            className={`${btnClass} text-wrap`}
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            disabled={score !== null}
                          >
                            {showFeedback && opt === q.correct_answer && <i className="bi bi-check-circle-fill me-2"></i>}
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showFeedback && !isCorrect && q.explanation && (
                      <div className="mt-3 p-3 bg-white text-danger rounded border border-danger">
                        <p className="fw-bold mb-1">
                          <i className="bi bi-x-circle-fill me-1"></i> Explanation for Incorrect Answer:
                        </p>
                        <p className="mb-0">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-muted text-center">No quiz available for this topic.</p>
            )}

            <div className="d-flex justify-content-end mt-4 pt-3 border-top">
              {quiz.questions.length > 0 && score === null && (
                <button
                  onClick={handleSubmitQuiz}
                  className="btn btn-primary btn-lg shadow-lg"
                  disabled={Object.keys(userAnswers).length !== quiz.questions.length}
                >
                  Submit Quiz <i className="bi bi-send-fill ms-2"></i>
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
