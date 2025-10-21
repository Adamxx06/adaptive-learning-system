import { useEffect, useRef } from "react";
import "../App.css";

type Topic = {
  id: number;
  title: string;
};

type Props = {
  courseId: number; // still available if you need it for context; unused here
  topics: Topic[];
  activeTopicId: number | null;
  onSelect: (id: number) => void;
};

export default function TopicsSidebar({
  topics,
  activeTopicId,
  onSelect,
}: Props) {
  const activeRef = useRef<HTMLLIElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // scroll active into view when activeTopicId changes
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeTopicId]);

  if (!topics || topics.length === 0)
    return <div className="p-4 text-center text-muted">No topics found.</div>;

  return (
    <div className="p-4">
      <h5 className="fw-bolder mb-4 text-primary">COURSE TOPICS</h5>
      <ul className="list-unstyled" ref={listRef}>
        {topics.map((t) => {
          const isActive = t.id === activeTopicId;
          return (
            <li
              key={t.id}
              ref={isActive ? activeRef : null}
              className={`p-2 mb-2 rounded transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-sm fw-bold"
                  : "text-dark hover-bg-light-primary"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(t.id)}
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
