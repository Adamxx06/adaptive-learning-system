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
  const [isUnlocked, setIsUnlocked] = useState(false);

  const MIN_SCORE = 4; // Minimum score to unlock next topic

  // Load topic and quiz
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

  // Load saved unlock progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`topicProgress_${topicId}`);
    if (saved) {
      const { unlocked } = JSON.parse(saved);
      setIsUnlocked(unlocked);
    } else {
      setIsUnlocked(false);
    }
  }, [topicId]);

  // Save progress automatically when score changes
  useEffect(() => {
    if (score !== null) {
      const unlocked = score >= MIN_SCORE;
      localStorage.setItem(
        `topicProgress_${topicId}`,
        JSON.stringify({ score, unlocked })
      );
      setIsUnlocked(unlocked);
    }
  }, [score, topicId]);

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

  // 🔹 Study reference materials by topic
  const getStudyLinks = () => {
    if (!topic) return [];

    const title = topic.title.toLowerCase();
    if (title.includes("html"))
      return [
        { name: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
        { name: "freeCodeCamp HTML", url: "https://www.freecodecamp.org/learn/" },
      ];
    if (title.includes("css"))
      return [
        { name: "MDN CSS Reference", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "W3Schools CSS Tutorial", url: "https://www.w3schools.com/css/" },
        { name: "CSS Tricks", url: "https://css-tricks.com/guides/" },
      ];
    if (title.includes("javascript") || title.includes("js"))
      return [
        { name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "W3Schools JS Tutorial", url: "https://www.w3schools.com/js/" },
        { name: "freeCodeCamp JS", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
      ];

    // Default fallback for any topic
    return [
      { name: "W3Schools Web Tutorials", url: "https://www.w3schools.com/" },
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/" },
    ];
  };

  if (!topic)
    return (
      <div className="p-5 text-center text-muted">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p>Loading topic…</p>
      </div>
    );

  const currentIndex = topics.findIndex((t) => t.id === topicId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < topics.length - 1;

  const studyLinks = getStudyLinks();

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

        {/* Topic Overview */}
        <section className="mb-5 p-4 bg-white rounded-4 shadow-sm border-start border-4 border-primary">
          <h2 className="h4 text-primary mb-3">Topic Overview</h2>
          <p style={{ whiteSpace: "pre-line", lineHeight: 1.8, fontSize: "1.05rem", color: "#222" }}>
            {topic.content}
          </p>
        </section>

        {/* Code Snippet */}
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
            <div className="card-header text-white" style={{ background: "linear-gradient(90deg, #0b132b, #1d3557, #457b9d)" }}>
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
                            else if (isSelected)
                              btnClass = "btn btn-danger text-white text-start shadow-sm";
                          } else if (isSelected) btnClass = "btn btn-info text-white text-start shadow";

                          return (
                            <button
                              key={opt}
                              className={`${btnClass} text-wrap`}
                              onClick={() => handleSelectAnswer(q.id, opt)}
                              disabled={score !== null}
                            >
                              {showFeedback && opt === q.correct_answer && <i className="bi bi-check-circle-fill me-2" />}
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showFeedback && !isCorrect && q.explanation && (
                        <div className="mt-3 p-3 bg-light border-start border-3 border-danger rounded-3">
                          <p className="fw-bold mb-1 text-danger">
                            <i className="bi bi-x-circle-fill me-1" /> Explanation:
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

        {/* 🔹 Study Resources if score < MIN_SCORE */}
        {score !== null && score < MIN_SCORE && studyLinks.length > 0 && (
          <div className="mt-5 p-4 bg-warning-subtle border-start border-4 border-warning rounded-4 shadow-sm">
            <h4 className="text-warning fw-bold mb-3">
              <i className="bi bi-lightbulb-fill me-2"></i>
              Recommended Study Materials
            </h4>
            <ul className="list-unstyled mb-0">
              {studyLinks.map((link) => (
                <li key={link.url} className="mb-2">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="fw-semibold text-decoration-none text-dark">
                    🔗 {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-secondary fst-italic">
              Review these materials, then retry the quiz. You need at least {MIN_SCORE} to unlock the next topic.
            </p>
          </div>
        )}

        {/* 🔹 Success message if score >= MIN_SCORE */}
        {score !== null && score >= MIN_SCORE && (
          <p className="text-success text-center mt-3 fw-semibold">
            ✅ Congratulations! You’ve unlocked the next topic.
          </p>
        )}

        {/* 🔹 Lock message if score < MIN_SCORE */}
        {score !== null && score < MIN_SCORE && (
          <p className="text-danger text-center mt-3 fw-semibold">
            ❌ You need at least {MIN_SCORE} correct answers to unlock the next topic.
          </p>
        )}

        {/* Navigation */}
        <div className="d-flex justify-content-between align-items-center mt-5">
          <button onClick={() => onNavigate("prev")} className="btn btn-outline-secondary rounded-pill px-4" disabled={!hasPrev}>
            <i className="bi bi-arrow-left-circle me-2" /> Previous Topic
          </button>

          <button onClick={() => onNavigate("next")} className="btn btn-primary rounded-pill px-4" disabled={!hasNext || !isUnlocked}>
            Next Topic <i className="bi bi-arrow-right-circle ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
