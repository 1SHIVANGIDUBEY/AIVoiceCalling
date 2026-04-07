import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState("");

  // Get username for the welcome message
  const username = localStorage.getItem("username") || "User";

  const uploadCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Send file to backend
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/upload-leads", {
      method: "POST",
      body: formData,
    });

    // Local preview logic
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").filter(row => row.trim() !== "").map((r) => r.split(","));
      const headers = rows[0];

      const formatted = rows.slice(1).map((row) => {
        let obj = {};
        headers.forEach((h, i) => {
          obj[h.trim()] = row[i];
        });
        return obj;
      });

      setData(formatted);
    };
    reader.readAsText(file);
  };

  const startCampaign = async () => {
    if (!template) {
      alert("Enter message template");
      return;
    }

    await fetch("http://localhost:5000/start-campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template: template,
      }),
    });

    alert("WhatsApp Campaign Started");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Integrated Sidebar with Avatar/Toggle logic */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          {/* Welcome Header from Avatar Feature */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600">
              Welcome, {username}
            </h1>
            <p className="text-gray-500 mt-1">Manage your leads and AI calling campaigns here.</p>
          </header>

          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Leads" value={data.length} />
            <StatCard title="Calls Today" value="120" />
            <StatCard title="Conversions" value="34" />
            <StatCard title="Success Rate" value="28%" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* CSV Upload Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Upload Leads CSV
              </h2>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".csv"
                  onChange={uploadCSV}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
            </div>

            {/* WhatsApp Campaign Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                WhatsApp Campaign
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Message template (example: Hi {name}, thanks for your interest)"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
                <button
                  onClick={startCampaign}
                  className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition shadow-md"
                >
                  Start WhatsApp Campaign
                </button>
              </div>
            </div>
          </div>

          {/* Leads Table Section */}
          {data.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h2 className="font-semibold text-gray-700">Leads Preview</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                    <tr>
                      {Object.keys(data[0]).map((key) => (
                        <th key={key} className="p-4 font-medium border-b">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50 transition-colors">
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="p-4 text-gray-600 text-sm">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
        {title}
      </h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}

export default Dashboard;