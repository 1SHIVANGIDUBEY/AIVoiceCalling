import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { campaignAPI } from "../services/api";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    region: "India",
    language: "English",
    status: "Created",
  });
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // Fetch all campaigns
  const fetchCampaigns = async () => {
    try {
      const res = await campaignAPI.get("");
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await campaignAPI.post("", formData);
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        region: "India",
        language: "English",
        status: "Created",
      });
      fetchCampaigns();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const handleStart = async (id) => {
    try {
      await campaignAPI.post(`/${id}/start`);
      fetchCampaigns();
    } catch (error) {
      console.error("Error starting campaign:", error);
    }
  };

  const handleSaveStatus = async () => {
    try {
      if (!editingId) return;
      await campaignAPI.put(`/${editingId}/status`, null, {
        params: { status: formData.status },
      });
      setEditingId(null);
      fetchCampaigns();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEdit = (campaign) => {
    setEditingId(campaign.id);
    setFormData({ ...formData, status: campaign.status });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Campaigns</h1>

      {/* Create Campaign Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <form className="flex flex-wrap gap-4" onSubmit={handleCreate}>
          <input
            type="text"
            name="name"
            placeholder="Campaign Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded flex-1"
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
          </select>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Created">Created</option>
            <option value="Running">Running</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Campaign
          </button>
        </form>
      </div>

      {/* Campaign Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Region</th>
              <th className="p-3">Language</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{camp.name}</td>
                <td className="p-3">{camp.startDate}</td>
                <td className="p-3">{camp.endDate}</td>
                <td className="p-3">{camp.region}</td>
                <td className="p-3">{camp.language}</td>
                <td className="p-3">
                  {editingId === camp.id ? (
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="border p-1 rounded"
                    >
                      <option value="Created">Created</option>
                      <option value="Running">Running</option>
                      <option value="Paused">Paused</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    camp.status
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleStart(camp.id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Start
                  </button>

                  <button
                    onClick={() => navigate(`/campaigns/${camp.id}`)}
                    className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                  >
                    View
                  </button>

                  {editingId === camp.id ? (
                    <button
                      onClick={handleSaveStatus}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(camp)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaigns;