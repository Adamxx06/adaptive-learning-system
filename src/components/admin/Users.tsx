// src/components/Admin/UsersPage.tsx
import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

type User = {
  name: string;
  email: string;
  role: string;
  joined: string;
};

const sampleUsers: User[] = [
  { name: "Ada Lovelace", email: "ada@example.com", role: "Admin", joined: "2025-09-10" },
  { name: "Grace Hopper", email: "grace@example.com", role: "Student", joined: "2025-09-11" },
  { name: "Linus Torvalds", email: "linus@example.com", role: "Instructor", joined: "2025-09-12" },
  { name: "Alan Turing", email: "alan@example.com", role: "Admin", joined: "2025-09-13" },
  { name: "Barbara Liskov", email: "barbara@example.com", role: "Student", joined: "2025-09-14" },
  { name: "Donald Knuth", email: "donald@example.com", role: "Admin", joined: "2025-09-15" },
];

const UsersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof User>("joined");
  const [asc, setAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("All");

  const pageSize = 5;

  // Filter + search
  let filtered = sampleUsers.filter(
    (u) =>
      (roleFilter === "All" || u.role === roleFilter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  // Sort
  filtered = filtered.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return asc ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return asc ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: keyof User) => {
    if (sortBy === field) setAsc(!asc);
    else {
      setSortBy(field);
      setAsc(true);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Users Management</h2>

      {/* Filters */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Instructor">Instructor</option>
          <option value="Student">Student</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark sticky-top">
            <tr>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("name")}>
                Name {sortBy === "name" && (asc ? "▲" : "▼")}
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("email")}>
                Email {sortBy === "email" && (asc ? "▲" : "▼")}
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("role")}>
                Role {sortBy === "role" && (asc ? "▲" : "▼")}
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("joined")}>
                Joined {sortBy === "joined" && (asc ? "▲" : "▼")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "Admin"
                          ? "bg-danger"
                          : user.role === "Instructor"
                          ? "bg-primary"
                          : "bg-success"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{user.joined}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-info me-2">
                      <FaEye />
                    </button>
                    <button className="btn btn-sm btn-outline-warning me-2">
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination + result info */}
      <div className="d-flex justify-content-between align-items-center">
        <span>
          Showing {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, filtered.length)} of {filtered.length} users
        </span>
        <div>
          <button
            className="btn btn-sm btn-secondary me-2"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <button
            className="btn btn-sm btn-secondary"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
