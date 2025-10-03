import { useEffect, useState } from "react";
import { getTopic } from "../services/api";

type Topic = {
  id: number;
  title: string;
  content: string;
  code_snippet: string;
};

export default function TopicView({ topicId }: { topicId: number }) {
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    async function fetchTopic() {
      try {
        const data = await getTopic(topicId);
        setTopic(data);
      } catch (err) {
        console.error(err);
      }
    }
    if (topicId) fetchTopic();
  }, [topicId]);

  if (!topic) return <div>Loading topic…</div>;

  return (
    <div>
      <h2>{topic.title}</h2>
      <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
        {topic.content}
      </p>
      {topic.code_snippet && (
        <pre className="bg-dark text-light p-3 rounded mt-2">
          <code>{topic.code_snippet}</code>
        </pre>
      )}
    </div>
  );
}
