import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", calls: 40 },
  { day: "Tue", calls: 80 },
  { day: "Wed", calls: 55 },
  { day: "Thu", calls: 120 },
  { day: "Fri", calls: 95 },
  { day: "Sat", calls: 60 },
];

function Analytics() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-10 flex-1">
          <div className="bg-black text-white p-6 rounded-xl border border-purple-500">
            <h2 className="text-xl mb-4 text-purple-400">Call Analytics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="day" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line type="monotone" dataKey="calls" stroke="#a855f7" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Analytics;