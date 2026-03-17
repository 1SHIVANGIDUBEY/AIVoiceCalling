import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Leads() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-10">
          {/* Keep your existing Leads content here */}
          <h1 className="text-3xl font-bold mb-6">Leads Management</h1>
          <div className="bg-white p-6 rounded-xl border shadow">
            <p>Leads uploaded via CSV will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads;