import { useEffect, useState } from "react";
import { listTopics } from "../services/api";

type Topic = {
  id: number;
  title: string;
};

export default function TopicsSidebar({ courseId, onSelect }: { courseId: number; onSelect: (id: number) => void }) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const data = await listTopics(courseId);
        setTopics(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchTopics();
  }, [courseId]);

  if (loading) return <div className="p-3">Loading topics…</div>;
  if (error) return <div className="p-3 text-danger">Error: {error}</div>;

  return (
    <div className="border-end p-3" style={{ width: "250px", minHeight: "100vh" }}>
      <h5 className="fw-bold mb-3">Topics</h5>
      <ul className="list-unstyled">
        {topics.map((t) => (
          <li
            key={t.id}
            className="p-2 mb-1 rounded hover-bg cursor-pointer"
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(t.id)}
          >
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
