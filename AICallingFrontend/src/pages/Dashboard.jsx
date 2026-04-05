import React, { useEffect, useState } from "react";
import { leadAPI, campaignAPI } from "../services/api";

const Dashboard = () => {
  const [leadsCount, setLeadsCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const leadsRes = await leadAPI.get("/count");
        setLeadsCount(leadsRes.data.count);

        const campaignRes = await campaignAPI.get("/count");
        setCampaignCount(campaignRes.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-lg">Total Leads</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{leadsCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-lg">Campaigns</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {campaignCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;