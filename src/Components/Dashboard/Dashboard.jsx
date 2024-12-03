
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
        backgroundColor: "#CED46A", // Yellow-Green for Bar Chart
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
        borderColor: "#07553B", // Dark Green for Line Chart Border
        backgroundColor: "rgba(7, 85, 59, 0.3)", // Dark Green background with transparency
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
      <div className="flex items-center p-4 bg-white">
        <Header />
      </div>
      <h1 className="text-3xl font-bold text-[#07553B] mb-6">Analytics Dashboard</h1> {/* Dark Green Text */}

      {/* Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <Bar data={barData} options={chartOptions} />
          <div className="mt-4">
            <h2 className="text-[#07553B] text-lg font-semibold">Website Views</h2> {/* Dark Green */}
            <p className="text-[#CED46A] text-sm">Last Campaign Performance</p> {/* Yellow-Green */}
            <p className="text-[#CED46A] text-xs">Campaign sent 2 days ago</p> {/* Yellow-Green */}
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <Line data={lineData} options={chartOptions} />
          <div className="mt-4">
            <h2 className="text-[#07553B] text-lg font-semibold">Daily Sales</h2> {/* Dark Green */}
            <p className="text-[#CED46A] text-sm">(+15%) increase in today's sales.</p> {/* Yellow-Green */}
            <p className="text-[#CED46A] text-xs">Updated 4 min ago</p> {/* Yellow-Green */}
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <Line data={lineData} options={chartOptions} />
          <div className="mt-4">
            <h2 className="text-[#07553B] text-lg font-semibold">Completed Tasks</h2> {/* Dark Green */}
            <p className="text-[#CED46A] text-sm">Last Campaign Performance</p> {/* Yellow-Green */}
            <p className="text-[#CED46A] text-xs">Just updated</p> {/* Yellow-Green */}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-[#07553B] font-bold">Bookings</h2> {/* Dark Green */}
          <p className="text-2xl font-semibold text-[#07553B]">281</p> {/* Dark Green */}
          <p className="text-[#CED46A] text-sm">+55% than last week</p> {/* Yellow-Green */}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-[#07553B] font-bold">Today's Users</h2> {/* Dark Green */}
          <p className="text-2xl font-semibold text-[#07553B]">2,300</p> {/* Dark Green */}
          <p className="text-[#CED46A] text-sm">+3% than last month</p> {/* Yellow-Green */}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-[#07553B] font-bold">Revenue</h2> {/* Dark Green */}
          <p className="text-2xl font-semibold text-[#07553B]">$34k</p> {/* Dark Green */}
          <p className="text-[#CED46A] text-sm">+1% than yesterday</p> {/* Yellow-Green */}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-[#07553B] font-bold">Followers</h2> {/* Dark Green */}
          <p className="text-2xl font-semibold text-[#07553B]">+91</p> {/* Dark Green */}
          <p className="text-[#CED46A] text-sm">Just updated</p> {/* Yellow-Green */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
