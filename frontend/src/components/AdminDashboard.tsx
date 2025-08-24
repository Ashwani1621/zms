"use client";

// components/AdminDashboard.tsx
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Pie chart: Adult/Child breakdown
const pieData1 = {
  labels: ["Adult", "Child"],
  datasets: [
    {
      data: [50, 20],
      backgroundColor: ["#1976D2", "#42A5F5"],
      borderWidth: 0,
    },
  ],
};

// Bar chart: Visitor Count per Day
const visitorBarData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Visitors",
      data: [10, 15, 5, 12, 20, 28, 25],
      backgroundColor: "#1976D2",
      borderRadius: 4,
      barThickness: 22,
    },
  ],
};

// Pie chart: Staff roles
const pieData2 = {
  labels: ["Admin", "Guide", "Veterinarian", "Zookeeper"],
  datasets: [
    {
      data: [6, 4, 3, 9],
      backgroundColor: ["#FFFFFF", "#D4D4D4", "#B3B3B3", "#2B2B2B"],
      borderWidth: 0,
    },
  ],
};

// Stats (with added Ticket Setup box)
const stats = [
  { label: "Child Visitors", value: 20 },
  { label: "Adult Visitors", value: 50 },
  { label: "Tickets Issued", value: 128 },
  { label: "Total Staff", value: 34 },
  { label: "Active Staff", value: 23 },
  { label: "On Leave", value: 11 },
  { label: "Ticket Setup", value: "Configure" },
];

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
  
      <main className="main-content m-10">
        <div className="charts-row">
          <div className="chart-card">
            <Pie data={pieData1} />
            <div className="legend-row">Adult / Child</div>
          </div>
          <div className="chart-card">
            <Bar data={visitorBarData} options={{
              plugins: { legend: { display: false }},
              scales: { x: { ticks: { color: "#42A5F5" }}, y: { ticks: { color: "#42A5F5" }, beginAtZero: true } }
            }}/>
            <div className="legend-row">Visitor Count Per Day</div>
          </div>
          <div className="chart-card">
            <Pie data={pieData2} />
            <div className="legend-row">Staff Roles</div>
          </div>
        </div>
        <div className="stats-row">
          {stats.map((s) => (
            <div key={s.label} className={`stat-card${s.label === "Ticket Setup" ? " stat-ticket" : ""}`}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        :global(body) {
          background: #0b101e;
        }
        .dashboard-container {
          min-height: 100vh;
          background: #0b101e;
          color: #fff;
        }
        // .navbar {
        //   display: flex;
        //   align-items: center;
        //   justify-content: space-between;
        //   background: #071220;
        //   padding: 22px 44px 18px 44px;
        //   box-shadow: 0 2px 16px rgba(25, 118, 210, 0.04);
        // }
        // .nav-left {
        //   display: flex;
        //   align-items: center;
        //   gap: 26px;
        // }
        // .nav-title {
        //   font-size: 1.37rem;
        //   font-weight: bold;
        //   color: #1976D2;
        // }
        // .nav-tabs {
        //   display: flex;
        //   gap: 16px;
        //   margin-left: 46px;
        // }
        // .nav-tabs span {
        //   color: #42A5F5;
        //   font-size: 1.07rem;
        //   cursor: pointer;
        //   position: relative;
        // }
        // .nav-tabs span:hover {
        //   color: #1976D2;
        // }
        // .nav-right {
        //   display: flex;
        //   gap: 12px;
        // }
        // .nav-btn {
        //   background: #fff;
        //   color: #1976D2;
        //   border: none;
        //   font-weight: bold;
        //   border-radius: 7px;
        //   padding: 7px 22px;
        //   font-size: 1rem;
        //   cursor: pointer;
        // }
        .primary-btn {
          background: #1976D2;
          color: #fff;
        }
        .main-content {
          padding: 48px 54px 32px 54px;
        }
        .charts-row {
          display: flex;
          gap: 32px;
          margin-bottom: 38px;
          justify-content: flex-start;
        }
        .chart-card {
          background: #151b2b;
          padding: 22px 26px;
          border-radius: 16px;
          box-shadow: 0 2px 18px rgba(25, 118, 210, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 240px;
        }
        .legend-row {
          margin-top: 16px;
          font-size: 1.1rem;
          color: #42A5F5;
          font-weight: 500;
        }
        .stats-row {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
        }
        .stat-card {
          background: #151b2b;
          border-radius: 12px;
          padding: 18px 38px;
          min-width: 190px;
          text-align: left;
          box-shadow: 0 2px 8px rgba(25, 118, 210, 0.04);
          margin-bottom: 16px;
        }
        .stat-label {
          font-size: 1.13rem;
          color: #42A5F5;
          font-weight: 500;
        }
        .stat-value {
          font-size: 2.6rem;
          font-weight: 700;
          margin-top: 2px;
          color: #fff;
        }
        .stat-ticket .stat-value {
          font-size: 1.25rem;
          color: #1976D2;
        }

        @media (max-width: 900px) {
          .navbar, .main-content {
            padding-left: 16px;
            padding-right: 16px;
          }
          .charts-row, .stats-row {
            flex-direction: column;
            gap: 18px;
          }
        }
      `}</style>
    </div>
  );
}
