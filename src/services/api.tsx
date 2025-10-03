const API_BASE = "http://localhost/codeadapt-backend/api";

/**
 * Fetch a single topic by ID
 */
export async function getTopic(topicId: number) {
  const res = await fetch(`${API_BASE}/get_topic.php?topic_id=${topicId}`);
  if (!res.ok) throw new Error("Failed to load topic");

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to load topic");

  return json.data; // Return only the topic object
}

/**
 * Fetch all topics for a course
 */
export async function listTopics(courseId: number) {
  const res = await fetch(`${API_BASE}/list_topics.php?course_id=${courseId}`);
  if (!res.ok) throw new Error("Failed to load topics");

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to load topics");

  return json.data; // Return an array of topic objects
}
