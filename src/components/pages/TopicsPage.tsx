import { useState, useEffect } from "react";
import TopicsSidebar from "../../components/TopicsSidebar";
import TopicView from "../../components/TopicView";

export default function TopicsPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Effect to close the sidebar on mobile after initial topic selection
  useEffect(() => {
    if (selectedTopicId !== null && window.innerWidth < 992) {
      setIsSidebarOpen(false);
    }
  }, [selectedTopicId]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
  
    <div className="d-flex flex-column flex-lg-row min-vh-100 bg-light">
      
      {/* 1. Mobile Sidebar Toggle Button */}
      <div className="d-lg-none p-3 shadow-sm bg-white">
        <button 
          className="btn btn-primary w-100"
          onClick={toggleSidebar}
        >
          <i className={`bi ${isSidebarOpen ? 'bi-x-lg' : 'bi-list-ul'} me-2`}></i>
          {isSidebarOpen ? 'Hide Topics' : 'Show Topics'}
        </button>
      </div>

      {/* 2. Sidebar Container */}
      <aside 
        className={`flex-shrink-0 bg-white border-end shadow-sm ${
          isSidebarOpen ? 'd-block' : 'd-none'
        } d-lg-block`}
        style={{ width: '100%', maxWidth: '280px' }} // Desktop width setting
      >
     
        <div className="d-flex flex-column vh-100 sticky-top overflow-auto"> 
            <TopicsSidebar 
                courseId={1} 
                onSelect={(id) => {
                    setSelectedTopicId(id);
                    if (window.innerWidth < 992) {
                        setIsSidebarOpen(false);
                    }
                }} 
            />
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">
        {selectedTopicId ? (
          <TopicView topicId={selectedTopicId} />
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center py-5">
            <i className="bi bi-book display-1 text-primary mb-3"></i>
            <h2 className="text-dark fw-bold">Welcome to the Course!</h2>
            <p className="lead text-muted mt-3">
              Please select a topic from the sidebar (or the "Show Topics" button on mobile) to begin your lesson.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}