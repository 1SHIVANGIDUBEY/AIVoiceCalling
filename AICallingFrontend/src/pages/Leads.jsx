import React, { useEffect, useState } from "react";
import { leadAPI } from "../services/api";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5; // can adjust as needed

  const fetchLeads = async (page = 0) => {
    try {
      const res = await leadAPI.get(`?page=${page}&size=${pageSize}`);
      setLeads(res.data.content);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await leadAPI.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchLeads(currentPage); // refresh current page after upload
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchLeads(page);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Leads</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6 flex items-center gap-4">
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage + 1 >= totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leads;