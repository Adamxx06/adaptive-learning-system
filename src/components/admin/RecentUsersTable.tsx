// src/components/Admin/RecentUsersTable.tsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import styles from "./Dashboard.module.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  created_at: string;
}

const RecentUsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const API_BASE = "http://localhost/codeadapt-backend/api";

  // Fetch recent users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/recent-users.php`);
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user with SweetAlert2 confirmation
  const confirmDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${API_BASE}/delete-user.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const res = await response.json();
      if (res.success) {
        setUsers(users.filter((u) => u.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res.message || "Unable to delete user.",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to the backend. Please try again.",
      });
    }
  };

  // Start editing
  const handleEdit = (user: User) => setEditingUser(user);

  // Save edit
  const saveEdit = async () => {
    if (!editingUser) return;
    try {
      const response = await fetch(`${API_BASE}/update_user_refined.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          name: `${editingUser.firstName} ${editingUser.lastName}`,
          email: editingUser.email,
          role: editingUser.role,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
        setEditingUser(null);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "User details were successfully updated.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: result.message || "Unable to update user.",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Failed to connect to backend.",
      });
    }
  };

  // Filter + Pagination
  const filtered = users.filter(
    (u) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <p>Loading users...</p>;

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
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No users found.
                </td>
              </tr>
            ) : (
              paginated.map((user, index) => (
                <tr key={user.id}>
                  <td>{(page - 1) * pageSize + index + 1}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => confirmDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Page {page} of {totalPages}
        </span>
        <div>
          <button className="btn btn-sm btn-secondary me-2" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
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

      {/* Edit Form */}
      {editingUser && (
        <div className="card p-4 shadow mt-4">
          <h4 className="mb-3 text-primary">Edit User</h4>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={editingUser.firstName}
              onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={editingUser.lastName}
              onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            />
          </div>
          <button className="btn btn-success me-2" onClick={saveEdit}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentUsersTable;
