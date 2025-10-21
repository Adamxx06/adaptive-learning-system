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

type Props = {
  topicId: number;
  topics: { id: number; title: string }[];
  onNavigate: (direction: "next" | "prev") => void;
};

export default function TopicView({ topicId, topics, onNavigate }: Props) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [originalQuestions, setOriginalQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
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
            setQuiz({
              id: 0,
              topic_id: topicId,
              title: "No Quiz Available",
              questions: [],
            });
          }
        }
      } catch (err) {
        console.error("Error fetching topic or quiz:", err);
        if (!cancelled) {
          setQuiz({
            id: 0,
            topic_id: topicId,
            title: "No Quiz Available",
            questions: [],
          });
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
      if (userAnswers[q.id] === q.correct_answer) correct++;
      else newWrongQuestions.push(q);
    });

    setScore(correct);
    setWrongQuestions(newWrongQuestions);
    setAttempts((prev) => prev + 1);
  };

  const handleRetryWrong = () => {
    if (wrongQuestions.length > 0) {
      setQuiz((prev) => (prev ? { ...prev, questions: wrongQuestions } : null));
      setUserAnswers({});
      setWrongQuestions([]);
      setScore(null);
    }
  };

  const handleRetryFullQuiz = () => {
    setQuiz((prev) => (prev ? { ...prev, questions: originalQuestions } : null));
    setUserAnswers({});
    setWrongQuestions([]);
    setScore(null);
    setAttempts(0);
  };

  if (!topic)
    return (
      <div className="p-5 text-center text-muted">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p>Loading topic…</p>
      </div>
    );

  // Determine current index for prev/next enabling
  const currentIndex = topics.findIndex((t) => t.id === topicId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < topics.length - 1;

  return (
    <div
      className="topic-view py-5 px-3 px-md-5"
      style={{
        background: "linear-gradient(180deg, #f8f9fa 0%, #e9f0f9 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container-lg">
        <h1 className="display-5 fw-bold mb-4 text-center text-primary">
          {topic.title}
        </h1>

        <section className="mb-5 p-4 bg-white rounded-4 shadow-sm border-start border-4 border-primary">
          <h2 className="h4 text-primary mb-3">Topic Overview</h2>
          <p style={{ whiteSpace: "pre-line", lineHeight: 1.8, fontSize: "1.05rem", color: "#222" }}>
            {topic.content}
          </p>
        </section>

        {topic.code_snippet && (
          <section className="mb-5">
            <h2 className="h5 text-secondary mb-3">Code Example</h2>
            <pre
              className="p-4 rounded-4 text-light shadow-lg"
              style={{
                background: "linear-gradient(135deg, #001f3f, #012a63, #023e8a)",
                overflowX: "auto",
                fontSize: "0.95rem",
                border: "none",
              }}
            >
              <code>{topic.code_snippet}</code>
            </pre>
          </section>
        )}

        {/* Quiz Section */}
        {quiz && (
          <section className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div
              className="card-header text-white"
              style={{ background: "linear-gradient(90deg, #0b132b, #1d3557, #457b9d)" }}
            >
              <h3 className="h5 mb-0 fw-semibold">{quiz.title || "Knowledge Check Quiz"}</h3>
            </div>

            <div className="card-body p-4 p-lg-5">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <p className="lead fw-bold mb-0 text-dark">
                  {score !== null ? `Your Score: ${score} / ${quiz.questions.length}` : `Attempt: ${attempts + 1}`}
                </p>
                {score !== null && (
                  <div>
                    {wrongQuestions.length > 0 && (
                      <button onClick={handleRetryWrong} className="btn btn-outline-warning btn-sm fw-bold me-2">
                        <i className="bi bi-arrow-repeat me-1" /> Retry Wrong
                      </button>
                    )}
                    <button onClick={handleRetryFullQuiz} className="btn btn-outline-primary btn-sm fw-bold">
                      <i className="bi bi-arrow-repeat me-1" /> Retry All
                    </button>
                  </div>
                )}
              </div>

              {quiz.questions.length > 0 ? (
                quiz.questions.map((q, i) => {
                  const isCorrect = userAnswers[q.id] === q.correct_answer;
                  const showFeedback = score !== null;

                  return (
                    <div key={q.id} className="mb-4 p-4 border rounded-4 bg-white shadow-sm">
                      <p className="fw-semibold mb-3 text-dark">
                        <span className="badge bg-primary me-2">Q{i + 1}</span>
                        {q.question}
                      </p>

                      <div className="d-grid gap-2">
                        {q.options.map((opt) => {
                          const isSelected = userAnswers[q.id] === opt;
                          let btnClass = "btn btn-outline-secondary text-start";

                          if (showFeedback) {
                            if (opt === q.correct_answer)
                              btnClass = "btn btn-success text-white text-start fw-bold shadow-sm";
                            else if (isSelected) btnClass = "btn btn-danger text-white text-start shadow-sm";
                          } else if (isSelected) btnClass = "btn btn-info text-white text-start shadow";

                          return (
                            <button
                              key={opt}
                              className={`${btnClass} text-wrap`}
                              onClick={() => handleSelectAnswer(q.id, opt)}
                              disabled={score !== null}
                            >
                              {showFeedback && opt === q.correct_answer && (
                                <i className="bi bi-check-circle-fill me-2" />
                              )}
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showFeedback && !isCorrect && q.explanation && (
                        <div className="mt-3 p-3 bg-light border-start border-3 border-danger rounded-3">
                          <p className="fw-bold mb-1 text-danger">
                            <i className="bi bi-x-circle-fill me-1" />
                            Explanation:
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

              {quiz.questions.length > 0 && score === null && (
                <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                  <button
                    onClick={handleSubmitQuiz}
                    className="btn btn-primary btn-lg shadow-lg rounded-pill px-4"
                    disabled={Object.keys(userAnswers).length !== quiz.questions.length}
                  >
                    Submit Quiz <i className="bi bi-send-fill ms-2" />
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between align-items-center mt-5">
          <button onClick={() => onNavigate("prev")} className="btn btn-outline-secondary rounded-pill px-4" disabled={!hasPrev}>
            <i className="bi bi-arrow-left-circle me-2" /> Previous Topic
          </button>

          <button onClick={() => onNavigate("next")} className="btn btn-primary rounded-pill px-4" disabled={!hasNext}>
            Next Topic <i className="bi bi-arrow-right-circle ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
