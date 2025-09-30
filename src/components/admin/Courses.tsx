import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Pagination } from "react-bootstrap";

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  students: number;
  date: string;
  status: "Active" | "Inactive";
}

const sampleCourses: Course[] = [
  {
    id: 1,
    title: "Intro to HTML",
    category: "HTML",
    instructor: "John Doe",
    students: 120,
    date: "2025-01-10",
    status: "Active",
  },
  {
    id: 2,
    title: "Advanced CSS",
    category: "CSS",
    instructor: "Jane Smith",
    students: 95,
    date: "2025-02-14",
    status: "Inactive",
  },
  {
    id: 3,
    title: "JavaScript Basics",
    category: "JavaScript",
    instructor: "Daniel Lee",
    students: 200,
    date: "2025-03-05",
    status: "Active",
  },
];

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Course>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtering
  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);

  const handleSort = (key: keyof Course) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <h2 className="mb-3">Courses Management</h2>

      {/* Search */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="primary">Search</Button>
      </InputGroup>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
              Title {sortKey === "title" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
              Category {sortKey === "category" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th>Instructor</th>
            <th onClick={() => handleSort("students")} style={{ cursor: "pointer" }}>
              Students {sortKey === "students" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
              Date {sortKey === "date" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.category}</td>
              <td>{course.instructor}</td>
              <td>{course.students}</td>
              <td>{course.date}</td>
              <td>
                <span
                  className={`badge ${
                    course.status === "Active" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {course.status}
                </span>
              </td>
              <td>
                <Button size="sm" variant="warning" className="me-2">
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setCourses(courses.filter((c) => c.id !== course.id))}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
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

      {/* Add Course */}
      <Button variant="success" className="mt-3">
        + Add Course
      </Button>
    </div>
  );
};

export default Courses;
