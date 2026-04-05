import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { campaignAPI } from "../services/api";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCampaign = async () => {
    try {
      const res = await campaignAPI.get(`/${id}`);
      setCampaign(res.data);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign not found!</div>;

  return (
    <div className="space-y-6">
      <button
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        onClick={() => navigate("/campaigns")}
      >
        Back to Campaigns
      </button>

      <h1 className="text-3xl font-bold text-blue-600">{campaign.name}</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <p><strong>Start Date:</strong> {campaign.startDate}</p>
        <p><strong>End Date:</strong> {campaign.endDate}</p>
        <p><strong>Region:</strong> {campaign.region}</p>
        <p><strong>Language:</strong> {campaign.language}</p>
        <p><strong>Status:</strong> {campaign.status}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Leads</h2>
        {campaign.leads && campaign.leads.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Region</th>
              </tr>
            </thead>
            <tbody>
              {campaign.leads.map((lead, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leads found for this campaign.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignDetail;