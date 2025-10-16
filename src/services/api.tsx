const API_BASE = "http://localhost/codeadapt-backend/api";

/**
 * Helper: Safe JSON fetch
 */
async function safeFetchJSON(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    // Attempt to parse JSON safely
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      console.error("❌ Non-JSON response:", text);
      throw new Error("Server returned invalid response (not JSON). Check PHP errors in backend.");
    }
  } catch (error: any) {
    console.error("🚨 Fetch failed:", error);
    throw new Error(error.message || "Network error connecting to backend.");
  }
}

/**
 * Fetch a single topic by ID
 */
export async function getTopic(topicId: number) {
  const json = await safeFetchJSON(`${API_BASE}/get_topic.php?topic_id=${topicId}`);
  if (!json.success) throw new Error(json.error || "Failed to load topic");
  return json.data;
}

/**
 * Fetch all topics for a course
 */
export async function listTopics(courseId: number) {
  const json = await safeFetchJSON(`${API_BASE}/list_topics.php?course_id=${courseId}`);
  if (!json.success) throw new Error(json.error || "Failed to load topics");
  return json.data;
}

/**
 * Fetch quiz for a topic
 */
export async function getQuiz(topicId: number) {
  const json = await safeFetchJSON(`${API_BASE}/get_quiz.php?topic_id=${topicId}`);
  if (!json.success) throw new Error(json.error || "Failed to load quiz");
  return json.data; // Return quiz object with questions
}

/**
 * Fetch list of courses (static for now)
 */
export async function listCourses() {
  return [
    { id: 1, title: "JavaScript", description: "Learn JS from basics to advanced." },
    { id: 2, title: "HTML", description: "Master HTML structure and semantics." },
    { id: 3, title: "CSS", description: "Style web pages beautifully with CSS." },
    { id: 4, title: "React", description: "Build interactive UIs using React." },
    { id: 5, title: "PHP", description: "Server-side scripting for web apps." },
    { id: 6, title: "SQL", description: "Work with databases effectively." },
  ];
}
