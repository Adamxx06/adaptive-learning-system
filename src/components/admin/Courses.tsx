import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";

interface Course {
  id: number;
  title: string;
  level: string;
  created_at: string;
  updated_at: string;
}

interface CustomModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  body: string;
  confirmText: string;
  onConfirm: () => void;
  variant: 'danger' | 'success';
}

const CustomConfirmModal: React.FC<CustomModalProps> = ({
  show,
  onHide,
  title,
  body,
  confirmText,
  onConfirm,
  variant
}) => {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant={variant} onClick={handleConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Course>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // State for Delete Confirmation Modal
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  // State for Success/Error Notification Modal
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationBody, setNotificationBody] = useState('');
  const [notificationVariant, setNotificationVariant] = useState<'success' | 'danger'>('success');


  const API_BASE = "http://localhost/codeadapt-backend/api";

  const showStatusNotification = (title: string, body: string, variant: 'success' | 'danger') => {
    setNotificationTitle(title);
    setNotificationBody(body);
    setNotificationVariant(variant);
    setShowNotification(true);
  };

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/get-courses.php`);
      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSort = (key: keyof Course) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const executeDelete = useCallback(async () => {
    if (!courseToDelete) return;

    try {
      const response = await fetch(`${API_BASE}/delete-course.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: courseToDelete }),
      });
      const res = await response.json();

      if (res.success) {
        setCourses(courses.filter((c) => c.id !== courseToDelete));
        showStatusNotification("Deleted!", "Course deleted successfully.", "success");
      } else {
        showStatusNotification("Error", res.message || "Unable to delete course.", "danger");
      }
    } catch (error) {
      console.error(error);
      showStatusNotification("Error", "Network error while deleting course.", "danger");
    } finally {
      setCourseToDelete(null); 
    }
  }, [courseToDelete, courses]);

  const confirmDelete = (id: number) => {
    setCourseToDelete(id);
    setShowConfirmDelete(true);
  };


  // Start editing
  const handleEdit = (course: Course) => setEditingCourse(course);

  // Save edit
  const saveEdit = async () => {
    if (!editingCourse) return;

    try {
      const res = await fetch(`${API_BASE}/update_course.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCourse),
      });
      const data = await res.json();

      if (data.success) {
        setCourses(
          courses.map((c) => (c.id === editingCourse.id ? editingCourse : c))
        );
        setEditingCourse(null);
        showStatusNotification("Updated!", "Course updated successfully.", "success");
      } else {
        showStatusNotification("Error", data.message || "Unable to update course.", "danger");
      }
    } catch (err) {
      console.error(err);
      showStatusNotification("Error", "Network error while updating course.", "danger");
    }
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.level.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div>
      <h2 className="mb-3">Courses Management</h2>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
              Title {sortKey === "title" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("level")} style={{ cursor: "pointer" }}>
              Category {sortKey === "level" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("created_at")} style={{ cursor: "pointer" }}>
              Date Created {sortKey === "created_at" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("updated_at")} style={{ cursor: "pointer" }}>
              Date Updated {sortKey === "updated_at" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.level}</td>
              <td>{new Date(course.created_at).toLocaleDateString()}</td>
              <td>{new Date(course.updated_at).toLocaleDateString()}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => confirmDelete(course.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx}
            active={idx + 1 === currentPage}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        />
      </Pagination>

      {/* Edit Form */}
      {editingCourse && (
        <div className="card p-4 shadow mt-4">
          <h4 className="mb-3 text-primary">Edit Course</h4>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={editingCourse.title}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={editingCourse.level}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, level: e.target.value })
              }
            />
          </Form.Group>
          <Button variant="success" className="me-2" onClick={saveEdit}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => setEditingCourse(null)}>
            Cancel
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <CustomConfirmModal
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
        title="Confirm Deletion"
        body="Are you sure you want to permanently delete this course?"
        confirmText="Yes, Delete it!"
        onConfirm={executeDelete}
        variant="danger"
      />

      {/* Status Notification Modal */}
      <Modal show={showNotification} onHide={() => setShowNotification(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className={`text-${notificationVariant}`}>
            {notificationTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notificationBody}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotification(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Courses;
