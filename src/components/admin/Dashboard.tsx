// src/components/Admin/Dashboard.tsx
import React, { useState, useEffect } from "react";
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


interface UserGrowthData { month: string; users: number }
interface CourseData { category: string; courses: number }
interface ActiveUserData { name: string; value: number }

interface DashboardData {
  userGrowth: UserGrowthData[];
  courseData: CourseData[];
  activeUsersData: ActiveUserData[];
  quickStats: {
    totalUsers: number;
    activeUsers: number;
    totalCourses: number;
    engagement: string;
  };
}

// ----------------------------------------------------
// 2. INITIAL STATE (Safe "Zero" values for first render)
// ----------------------------------------------------
const initialData: DashboardData = {
  userGrowth: [],
  courseData: [],
  activeUsersData: [],
  quickStats: {
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 0,
    engagement: "0%",
  },
};

const COLORS = ["#2563eb", "#f87171"];

const Dashboard: React.FC = () => {
  // Set up state to hold data and loading status
  const [data, setData] = useState<DashboardData>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  
  // NOTE: Adjust the API_URL to where your PHP file is located
  const API_URL = "http://localhost/codeadapt-backend/api/dashboard-data.php";

  // 3. DATA FETCHING LOGIC
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const fetchedData: DashboardData = await response.json();
        
        // This line assumes your PHP outputs the full structure correctly
        setData(fetchedData); 

      } catch (error) {
        console.error("Could not fetch dashboard data:", error);
        // Optionally, set an error state here
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array: runs only once on mount

  // Display a loading message while fetching data
  if (isLoading) {
      return <div className={styles.wrapper}>Loading Dashboard Data...</div>;
  }

  // 4. RENDER COMPONENT USING STATE DATA
  return (
    <div className={styles.wrapper}>
      {/* Quick stat cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Users</div>
          {/* Using state data */}
          <div className={styles.statValue}>{data.quickStats.totalUsers.toLocaleString()}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Active Users</div>
          {/* Using state data */}
          <div className={styles.statValue}>{data.quickStats.activeUsers.toLocaleString()}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Courses</div>
          {/* Using state data */}
          <div className={styles.statValue}>{data.quickStats.totalCourses}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Engagement</div>
          {/* Using state data */}
          <div className={styles.statValue}>{data.quickStats.engagement}</div>
        </div>
      </div>

      {/* Charts layout */}
      <div className={styles.chartsGrid}>
        {/* Line Chart */}
        <div className={styles.chartCardLarge}>
          <div className={styles.cardHeader}>User Growth (Jan–Dec)</div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              {/* Using state data */}
              <LineChart data={data.userGrowth}> 
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
              {/* Using state data */}
              <BarChart data={data.courseData}>
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
                {/* Using state data */}
                <Pie
                  data={data.activeUsersData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {/* Using state data */}
                  {data.activeUsersData.map((_, idx) => (
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