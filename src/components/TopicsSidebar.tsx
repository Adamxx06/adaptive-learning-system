import { useEffect, useState } from "react";
import { listTopics } from "../services/api";
import "../App.css";

type Topic = {
  id: number;
  title: string;
};

type Props = {
  courseId: number;
  onSelect: (id: number) => void;
  /**
   * Optional initialActiveTopicId:
   * - If provided, the sidebar will auto-select that topic after loading.
   * - If not provided, the sidebar will auto-select the first topic once it's loaded.
   */
  initialActiveTopicId?: number | null;
};

export default function TopicsSidebar({ courseId, onSelect, initialActiveTopicId = null }: Props) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<number | null>(initialActiveTopicId);

  useEffect(() => {
    let cancelled = false;
    async function fetchTopics() {
      setLoading(true);
      setError(null);
      try {
        const data = await listTopics(courseId);
        if (!cancelled) {
          setTopics(data || []);
          setLoading(false);
          // If navigation provided a specific initial id, prefer that.
          if (initialActiveTopicId && data && data.length > 0) {
            const exists = data.some((t: Topic) => t.id === initialActiveTopicId);
            if (exists) {
              setActiveTopicId(initialActiveTopicId);
              onSelect(initialActiveTopicId);
              return;
            }
          }
          // If there's no initialActiveTopicId or it wasn't found, set the first topic as active
          if (data && data.length > 0) {
            // If no active set yet, pick first
            setActiveTopicId((prev) => {
              if (prev === null) {
                const firstId = data[0].id;
                onSelect(firstId);
                return firstId;
              }
              return prev;
            });
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Failed to load topics.");
          setLoading(false);
        }
      }
    }
    fetchTopics();
    return () => {
      cancelled = true;
    };
  }, [courseId, initialActiveTopicId, onSelect]);

  if (loading) return <div className="p-4 text-center text-muted">Loading topics…</div>;
  if (error) return <div className="p-4 text-danger text-center">Error: {error}</div>;
  if (!topics.length) return <div className="p-4 text-center text-muted">No topics found for this course.</div>;

  return (
    <div className="p-4">
      <h5 className="fw-bolder mb-4 text-primary">COURSE TOPICS</h5>
      <ul className="list-unstyled">
        {topics.map((t) => {
          const isActive = t.id === activeTopicId;
          return (
            <li
              key={t.id}
              className={`p-2 mb-2 rounded transition-colors ${isActive ? "bg-primary text-white shadow-sm fw-bold" : "text-dark hover-bg-light-primary"}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setActiveTopicId(t.id);
                onSelect(t.id);
              }}
              role="button"
              aria-pressed={isActive}
            >
              <i className={`bi ${isActive ? "bi-check-circle-fill" : "bi-circle"}`} style={{ marginRight: 8 }}></i>
              {t.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
