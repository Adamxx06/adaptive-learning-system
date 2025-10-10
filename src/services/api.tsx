const API_BASE = "http://localhost/codeadapt-backend/api";

/**
 * Fetch a single topic by ID
 */
export async function getTopic(topicId: number) {
  const res = await fetch(`${API_BASE}/get_topic.php?topic_id=${topicId}`);
  if (!res.ok) throw new Error("Failed to load topic");

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to load topic");

  return json.data;
}

/**
 * Fetch all topics for a course
 */
export async function listTopics(courseId: number) {
  const res = await fetch(`${API_BASE}/list_topics.php?course_id=${courseId}`);
  if (!res.ok) throw new Error("Failed to load topics");

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to load topics");

  return json.data;
}

/**
 * Fetch quiz for a topic
 */
export async function getQuiz(topicId: number) {
  const res = await fetch(`${API_BASE}/get_quiz.php?topic_id=${topicId}`);
  if (!res.ok) throw new Error("Failed to load quiz");

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to load quiz");

  return json.data; // Return quiz object with questions
}

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


