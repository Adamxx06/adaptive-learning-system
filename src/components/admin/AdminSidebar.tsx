import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaUsers, FaCog, FaBars } from "react-icons/fa";
import styles from "./Sidebar.module.css";

const AdminSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button for small screens */}
      <button
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        <FaBars size={24} />
      </button>

      {/* Overlay */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.logo}>CodeAdapt Admin</div>
        <nav className={styles.nav}>
          <NavLink to="/admin" end className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }>
            <FaTachometerAlt className={styles.icon} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/courses" className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }>
            <FaBook className={styles.icon} />
            Courses
          </NavLink>

          <NavLink to="/admin/users" className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }>
            <FaUsers className={styles.icon} />
            Users
          </NavLink>

          <NavLink to="/admin/settings" className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }>
            <FaCog className={styles.icon} />
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
