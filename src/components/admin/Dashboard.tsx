// src/components/Admin/Dashboard.tsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import RecentUsersTable from "./RecentUsersTable";
import styles from "./Dashboard.module.css";

/* Sample data */
const userData = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 350 },
  { month: "Mar", users: 500 },
  { month: "Apr", users: 700 },
  { month: "May", users: 900 },
  { month: "Jun", users: 1100 },
  { month: "Jul", users: 1400 },
  { month: "Aug", users: 1600 },
  { month: "Sep", users: 1850 },
  { month: "Oct", users: 2000 },
  { month: "Nov", users: 2200 },
  { month: "Dec", users: 2500 },
];

const courseData = [
  { category: "HTML", courses: 12 },
  { category: "CSS", courses: 8 },
  { category: "JavaScript", courses: 15 },
];

const activeUsersData = [
  { name: "Active", value: 1600 },
  { name: "Inactive", value: 400 },
];

const COLORS = ["#2563eb", "#f87171"];

const Dashboard: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      {/* Quick stat cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Users</div>
          <div className={styles.statValue}>1,245</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Active Users</div>
          <div className={styles.statValue}>1,600</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Courses</div>
          <div className={styles.statValue}>35</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Engagement</div>
          <div className={styles.statValue}>87%</div>
        </div>
      </div>

      {/* Charts layout */}
      <div className={styles.chartsGrid}>
        {/* Line Chart */}
        <div className={styles.chartCardLarge}>
          <div className={styles.cardHeader}>User Growth (Jan–Dec)</div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>Courses per Category</div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="courses" fill="#16a34a" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>User Activity</div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeUsersData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {activeUsersData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <RecentUsersTable />
    </div>
  );
};

export default Dashboard;
