// src/components/Admin/RecentUsersTable.tsx
import React, { useState } from "react";
import styles from "./Dashboard.module.css";

/* Example static data (replace with API later) */
const allUsers = [
  { name: "Ada Lovelace", email: "ada@example.com", joined: "2025-09-10", role: "Admin" },
  { name: "Grace Hopper", email: "grace@example.com", joined: "2025-09-11", role: "Student" },
  { name: "Linus Torvalds", email: "linus@example.com", joined: "2025-09-12", role: "Student" },
  { name: "Alan Turing", email: "alan@example.com", joined: "2025-09-13", role: "Instructor" },
  { name: "Barbara Liskov", email: "barbara@example.com", joined: "2025-09-14", role: "Student" },
  { name: "Donald Knuth", email: "donald@example.com", joined: "2025-09-15", role: "Admin" },
];

/* Helper function to sort */
const sortData = (data: typeof allUsers, sortBy: keyof typeof allUsers[0], asc: boolean) => {
  return [...data].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return asc ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return asc ? 1 : -1;
    return 0;
  });
};

const RecentUsersTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof typeof allUsers[0]>("joined");
  const [asc, setAsc] = useState(true);

  const pageSize = 5;

  /* Filter + Sort */
  let filtered = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  filtered = sortData(filtered, sortBy, asc);

  /* Pagination */
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  /* Handle sorting */
  const handleSort = (field: keyof typeof allUsers[0]) => {
    if (sortBy === field) setAsc(!asc);
    else {
      setSortBy(field);
      setAsc(true);
    }
  };

  return (
    <div className={`${styles.tableCard} mt-5 p-3 rounded shadow-sm`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Recent Users</h3>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                Name {sortBy === "name" && (asc ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                Email {sortBy === "email" && (asc ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("joined")} style={{ cursor: "pointer" }}>
                Date Joined {sortBy === "joined" && (asc ? "▲" : "▼")}
              </th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.joined}</td>
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
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">View</button>
                    <button className="btn btn-sm btn-outline-warning me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
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

      {/* Pagination controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Page {page} of {totalPages}
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

export default RecentUsersTable;
