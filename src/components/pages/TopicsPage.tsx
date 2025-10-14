import { useState, useEffect } from "react";
import TopicsSidebar from "../../components/TopicsSidebar";
import TopicView from "../../components/TopicView";
import { useParams, useLocation } from "react-router-dom"; // Added useParams


export default function TopicsPage() {
  const location = useLocation();
  // Use useParams to get ID from the URL
  const { courseId: courseIdParam } = useParams<{ courseId: string }>();

  // Convert the ID to a number, defaulting to null if invalid
  // If the path is /courses/2/topics, courseId will be 2.
  const courseId = courseIdParam ? parseInt(courseIdParam) : null;
  
  // Read initialTopicId from navigation state
  const navState: any = location.state ?? {};
  const initialTopicIdFromNav = typeof navState.initialTopicId === "number" ? navState.initialTopicId : null;

  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(initialTopicIdFromNav);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Close the sidebar on mobile after a selection
  useEffect(() => {
    if (selectedTopicId !== null && window.innerWidth < 992) {
      setIsSidebarOpen(false);
    }
  }, [selectedTopicId]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  // Handle case where courseId is missing or invalid (e.g., direct access to /topics)
  if (courseId === null || isNaN(courseId)) {
    return (
      <div className="text-center py-5">
        <h2 className="text-danger">Error: Invalid Course ID provided.</h2>
        <p className="lead">Please navigate from the main courses page.</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100 bg-light">
      {/* Mobile Sidebar Toggle */}
      <div className="d-lg-none p-3 shadow-sm bg-white">
        <button
          className="btn btn-primary w-100"
          onClick={toggleSidebar}
          aria-expanded={isSidebarOpen}
        >
          <i className={`bi ${isSidebarOpen ? "bi-x-lg" : "bi-list-ul"} me-2`}></i>
          {isSidebarOpen ? "Hide Topics" : "Show Topics"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 bg-white border-end shadow-sm ${isSidebarOpen ? "d-block" : "d-none"} d-lg-block`}
        style={{ width: "100%", maxWidth: "320px" }}
      >
        <div className="d-flex flex-column vh-100 sticky-top overflow-auto">
          {/* Pass the dynamic courseid to the sidebar*/}
          <TopicsSidebar
            courseId={courseId} 
            initialActiveTopicId={initialTopicIdFromNav}
            onSelect={(id) => {
              setSelectedTopicId(id);
              if (window.innerWidth < 992) {
                setIsSidebarOpen(false);
              }
            }}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">
        {selectedTopicId ? (
          <TopicView topicId={selectedTopicId} />
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center py-5">
            <i className="bi bi-book display-1 text-primary mb-3"></i>
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