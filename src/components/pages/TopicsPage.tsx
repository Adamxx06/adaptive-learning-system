import { useState, useEffect } from "react";
import TopicsSidebar from "../../components/TopicsSidebar";
import TopicView from "../../components/TopicView";
import { useParams, useLocation } from "react-router-dom";
import { listTopics } from "../../services/api";

type Topic = { id: number; title: string };

export default function TopicsPage() {
  const location = useLocation();
  const { courseId: courseIdParam } = useParams<{ courseId: string }>();
  const courseId = courseIdParam ? parseInt(courseIdParam, 10) : null;

  const navState: any = location.state ?? {};
  const initialTopicIdFromNav =
    typeof navState.initialTopicId === "number"
      ? navState.initialTopicId
      : null;

  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(
    initialTopicIdFromNav
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(true);

  // Track unlock status of current topic
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Fetch topics list
  useEffect(() => {
    if (courseId === null || isNaN(courseId)) return;

    async function fetchTopics() {
      setLoadingTopics(true);
      try {
        const data = await listTopics(courseId);
        if (data && data.length > 0) {
          setTopics(data);
          if (selectedTopicId === null) {
            setSelectedTopicId(data[0].id); // ✅ guaranteed number
          }
        }
      } catch (err) {
        console.error("Error fetching topics:", err);
      } finally {
        setLoadingTopics(false);
      }
    }

    fetchTopics();
  }, [courseId]);

  // Close sidebar on mobile after topic selection
  useEffect(() => {
    if (selectedTopicId !== null && window.innerWidth < 992) {
      setIsSidebarOpen(false);
    }
  }, [selectedTopicId]);

  // Read topic unlock status from localStorage
  useEffect(() => {
    if (selectedTopicId === null) return;

    const saved = localStorage.getItem(`topicProgress_${selectedTopicId}`);
    if (saved) {
      const { unlocked } = JSON.parse(saved);
      setIsUnlocked(!!unlocked);
    } else {
      setIsUnlocked(false);
    }
  }, [selectedTopicId]);

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);

  if (courseId === null || isNaN(courseId)) {
    return (
      <div className="text-center py-5">
        <h2 className="text-danger">Error: Invalid Course ID provided.</h2>
        <p className="lead">Please navigate from the main courses page.</p>
      </div>
    );
  }

  // Parent-controlled next / prev
  const handleNextPrev = (direction: "next" | "prev") => {
    if (!topics.length || selectedTopicId === null) return;

    const currentIndex = topics.findIndex((t) => t.id === selectedTopicId);
    if (currentIndex === -1) return;

    if (direction === "next" && currentIndex < topics.length - 1) {
      setSelectedTopicId(topics[currentIndex + 1].id);
    } else if (direction === "prev" && currentIndex > 0) {
      setSelectedTopicId(topics[currentIndex - 1].id);
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100 bg-light">
      {/* Mobile Sidebar Toggle */}
      <div className="d-lg-none p-3 shadow-sm bg-white">
        <button
          className="btn btn-primary w-100"
          onClick={toggleSidebar}
          aria-expanded={isSidebarOpen}
        >
          <i
            className={`bi ${
              isSidebarOpen ? "bi-x-lg" : "bi-list-ul"
            } me-2`}
          />
          {isSidebarOpen ? "Hide Topics" : "Show Topics"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 bg-white border-end shadow-sm ${
          isSidebarOpen ? "d-block" : "d-none"
        } d-lg-block`}
        style={{ width: "100%", maxWidth: "320px" }}
      >
        <div className="d-flex flex-column vh-100 sticky-top overflow-auto">
          {!loadingTopics && topics.length > 0 && selectedTopicId !== null && (
            <TopicsSidebar
              courseId={courseId} // ✅ number
              topics={topics}
              activeTopicId={selectedTopicId} // ✅ number
              onSelect={(id: number) => setSelectedTopicId(id)}
              isUnlocked={isUnlocked} // ✅ boolean
            />
          )}

          {loadingTopics && (
            <div className="p-4 text-center text-muted">Loading topics…</div>
          )}
          {!loadingTopics && topics.length === 0 && (
            <div className="p-4 text-center text-muted">
              No topics found for this course.
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">
        {selectedTopicId !== null && topics.length > 0 ? (
          <TopicView
            topicId={selectedTopicId} // ✅ guaranteed number
            onNavigate={handleNextPrev}
            topics={topics}
          />
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center py-5">
            <i className="bi bi-book display-1 text-primary mb-3" />
            <h2 className="text-dark fw-bold">Welcome to the Course!</h2>
            <p className="lead text-muted mt-3">
              Please select a topic from the sidebar to begin your lesson.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
