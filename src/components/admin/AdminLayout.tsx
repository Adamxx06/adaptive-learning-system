// src/components/admin/AdminLayout.tsx
import { Outlet, NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaUsers, FaCog } from "react-icons/fa";
import styles from "./AdminLayout.module.css";

const AdminLayout = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>CodeAdapt Admin</h2>
        <nav>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FaTachometerAlt className={styles.icon} />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FaBook className={styles.icon} />
            Courses
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FaUsers className={styles.icon} />
            Users
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FaCog className={styles.icon} />
            Settings
          </NavLink>
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
