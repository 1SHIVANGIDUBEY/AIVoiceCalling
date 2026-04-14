import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Centralized configuration for the microservices
const SERVICES = {
  LEAD: "http://localhost:8081",
  CAMPAIGN: "http://localhost:8082",
};

function Dashboard() {
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState("");
  const [totalLeads, setTotalLeads] = useState(0);

  // Get username for the welcome message
  const username = localStorage.getItem("username") || "User";

  // Fetch initial data from Spring Boot on load
  useEffect(() => {
    fetchLeads();
    fetchCount();
  }, []);

  const fetchLeads = async () => {
    try {
      // Sudhir's LeadController uses pagination (default size 5)
      const res = await fetch(`${SERVICES.LEAD}/api/leads?page=0&size=10`);
      const result = await res.json();
      // PagedResponse usually contains data in a 'content' field
      setData(result.content || []);
    } catch (err) {
      console.error("Error fetching leads from microservice:", err);
    }
  };

  const fetchCount = async () => {
    try {
      const res = await fetch(`${SERVICES.LEAD}/api/leads/count`);
      const result = await res.json();
      setTotalLeads(result.count || 0);
    } catch (err) {
      console.error("Error fetching lead count:", err);
    }
  };

  const uploadCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Send file to Spring Boot Lead Service
    const formData = new FormData();
    formData.append("file", file); // Must match @RequestParam("file") in Java

    try {
      const response = await fetch(`${SERVICES.LEAD}/api/leads/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded and processed by Lead Service!");
        // Refresh data after successful upload
        fetchLeads();
        fetchCount();
      } else {
        alert("Upload failed. Check console for details.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Lead Service (8081) is not responding.");
    }
  };

  const startCampaign = async () => {
    if (!template) {
      alert("Enter message template");
      return;
    }

    try {
      // Pointing to the Campaign Service on port 8082
      await fetch(`${SERVICES.CAMPAIGN}/api/campaign/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template: template,
        }),
      });
      alert("WhatsApp Campaign Started");
    } catch (error) {
      console.error("Campaign error:", error);
      alert("Campaign Service (8082) is not responding.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600">
              Welcome, {username}
            </h1>
            <p className="text-gray-500 mt-1">Manage your leads and AI calling campaigns here.</p>
          </header>

          {/* Stats Cards Section - Now using dynamic totalLeads */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Leads" value={totalLeads} />
            <StatCard title="Calls Today" value="120" />
            <StatCard title="Conversions" value="34" />
            <StatCard title="Success Rate" value="28%" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                <h2 className="font-semibold text-gray-700">Leads Preview (Database)</h2>
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