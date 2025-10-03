import { useState } from "react";
import TopicsSidebar from "../../components/TopicsSidebar";
import TopicView from "../../components/TopicView";

export default function TopicsPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  return (
    <div className="d-flex">
      {/* Sidebar with topics */}
      <TopicsSidebar courseId={1} onSelect={(id) => setSelectedTopicId(id)} />

      {/* Topic details */}
      <div className="flex-grow-1 p-4">
        {selectedTopicId ? (
          <TopicView topicId={selectedTopicId} />
        ) : (
          <p>Select a topic from the sidebar</p>
        )}
      </div>
    </div>
  );
}
