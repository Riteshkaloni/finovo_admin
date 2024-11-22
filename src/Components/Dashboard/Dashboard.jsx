import React from "react";
import { Bar, Line } from "react-chartjs-2";
import Header from "../Header/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const barData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Views",
        data: [60, 40, 30, 50, 70, 60, 40],
        backgroundColor: "#4CAF50",
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Apr", "Jun", "Aug", "Oct", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [200, 300, 400, 350, 450],
        borderColor: "#FBBF24",
        backgroundColor: "rgba(251, 191, 36, 0.3)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[80vw] ml-2">
<div className="flex items-center p-4 bg-gray-100">

<Header />
</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

      {/* Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-blue-500 shadow-md rounded-lg p-4">
          <Bar data={barData} options={chartOptions} />
          <div className="mt-4">
            <h2 className="text-white text-lg font-semibold">Website Views</h2>
            <p className="text-blue-100 text-sm">Last Campaign Performance</p>
            <p className="text-blue-200 text-xs">Campaign sent 2 days ago</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-green-500 shadow-md rounded-lg p-4">
          <Line data={lineData} options={chartOptions} />
          <div className="mt-4">
            <h2 className="text-white text-lg font-semibold">Daily Sales</h2>
            <p className="text-green-100 text-sm">
              (+15%) increase in today sales.
            </p>
            <p className="text-green-200 text-xs">Updated 4 min ago</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-gray-800 shadow-md rounded-lg p-4">
          <Line data={lineData} options={chartOptions} />
          <div className="mt-4">
            <h2 className="text-white text-lg font-semibold">Completed Tasks</h2>
            <p className="text-gray-300 text-sm">Last Campaign Performance</p>
            <p className="text-gray-400 text-xs">Just updated</p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-gray-600 font-bold">Bookings</h2>
          <p className="text-2xl font-semibold text-gray-800">281</p>
          <p className="text-green-500 text-sm">+55% than last week</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-gray-600 font-bold">Today's Users</h2>
          <p className="text-2xl font-semibold text-gray-800">2,300</p>
          <p className="text-blue-500 text-sm">+3% than last month</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-gray-600 font-bold">Revenue</h2>
          <p className="text-2xl font-semibold text-gray-800">$34k</p>
          <p className="text-green-500 text-sm">+1% than yesterday</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-gray-600 font-bold">Followers</h2>
          <p className="text-2xl font-semibold text-gray-800">+91</p>
          <p className="text-pink-500 text-sm">Just updated</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
