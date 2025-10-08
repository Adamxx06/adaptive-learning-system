import { useEffect, useState } from "react";
import { listTopics } from "../services/api";
import "../App.css";


type Topic = {
  id: number;
  title: string;
};

// Removed 'width' and 'minHeight' inline styles as they are now handled by the parent layout.
export default function TopicsSidebar({ courseId, onSelect }: { courseId: number; onSelect: (id: number) => void }) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // NEW: Track the currently selected topic for distinct styling
  const [activeTopicId, setActiveTopicId] = useState<number | null>(null);

  // ... (useEffect for data fetching remains the same)
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

  if (loading) return <div className="p-4 text-center text-muted">Loading topics…</div>;
  if (error) return <div className="p-4 text-danger text-center">Error: {error}</div>;

  return (
    // 'p-4' for better padding than 'p-3'
    <div className="p-4"> 
      <h5 className="fw-bolder mb-4 text-primary">COURSE TOPICS</h5> 
      <ul className="list-unstyled">
        {topics.map((t) => {
          const isActive = t.id === activeTopicId;
          return (
            <li
              key={t.id}
              // Conditional classes for active state and hover effect
              className={`p-2 mb-2 rounded transition-colors ${
                isActive 
                  ? "bg-primary text-white shadow-sm fw-bold" 
                  : "text-dark hover-bg-light-primary" // Custom class for modern hover
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setActiveTopicId(t.id); // Set the active state
                onSelect(t.id);
              }}
            >
              <i className={`bi ${isActive ? 'bi-check-circle-fill' : 'bi-circle'}`} style={{ marginRight: '8px' }}></i> 
              {t.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}