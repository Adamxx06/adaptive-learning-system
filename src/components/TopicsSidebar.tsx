import { useEffect, useRef } from "react";
import "../App.css";

type Topic = {
  id: number;
  title: string;
};

type Props = {
  courseId: number;
  topics: Topic[];
  activeTopicId: number | null;
  onSelect: (id: number) => void;
  isUnlocked: boolean; // controls access to next topics
};

export default function TopicsSidebar({
  topics,
  activeTopicId,
  onSelect,
  isUnlocked,
}: Props) {
  const activeRef = useRef<HTMLLIElement | null>(null);

  // Scroll active topic into view
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeTopicId]);

  if (!topics.length)
    return <div className="p-4 text-center text-muted">No topics found.</div>;

  const activeIndex = topics.findIndex((t) => t.id === activeTopicId);

  return (
    <div className="p-4">
      <h5 className="fw-bolder mb-4 text-primary">COURSE TOPICS</h5>
      <ul className="list-unstyled">
        {topics.map((t, index) => {
          const isActive = t.id === activeTopicId;
          const isDisabled = !isUnlocked && index > activeIndex;

          return (
            <li
              key={t.id}
              ref={isActive ? activeRef : null}
              className={`p-2 mb-2 rounded transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-sm fw-bold"
                  : isDisabled
                  ? "text-muted cursor-not-allowed"
                  : "text-dark hover-bg-light-primary"
              }`}
              style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
              onClick={() => !isDisabled && onSelect(t.id)}
              role="button"
              aria-pressed={isActive}
            >
              <i
                className={`bi ${isActive ? "bi-check-circle-fill" : "bi-circle"}`}
                style={{ marginRight: 8 }}
              />
              {t.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
