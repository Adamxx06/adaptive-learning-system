import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface Course {
  id: number;
  title: string;
  level: string;
  created_at: string;
  updated_at: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Course>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const API_BASE = "http://localhost/codeadapt-backend/api";

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/get-courses.php`);
      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete course
  const confirmDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This course will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${API_BASE}/delete-course.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const res = await response.json();
      if (res.success) {
        setCourses(courses.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "Course deleted successfully.", "success");
      } else Swal.fire("Error", res.message || "Unable to delete course.", "error");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Network error while deleting course.", "error");
    }
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
        Swal.fire("Updated!", "Course updated successfully.", "success");
      } else {
        Swal.fire("Error", data.message || "Unable to update course.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Network error while updating course.", "error");
    }
  };

  // Sorting + filtering + pagination
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
            <th>Date Created</th>
            <th>Date Updated</th>
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
    </div>
  );
};

export default Courses;
