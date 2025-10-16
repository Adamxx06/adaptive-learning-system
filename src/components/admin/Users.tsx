import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joined: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const API_BASE = "http://localhost/codeadapt-backend/api";

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/get-users.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.success) setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ SweetAlert2 delete confirmation
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

        await Swal.fire({
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
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  // Save edit (already works fine with your PHP)
  const saveEdit = async () => {
    if (!editingUser) return;
    try {
      const response = await fetch(`${API_BASE}/update_user_refined.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          name: editingUser.name,
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

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary">Registered Users</h2>

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.joined}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => confirmDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Form */}
      {editingUser && (
        <div className="card p-4 shadow mt-4">
          <h4 className="mb-3 text-primary">Edit User</h4>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success me-2" onClick={saveEdit}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setEditingUser(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
