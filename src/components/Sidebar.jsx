import { Link } from "react-router-dom";

function Sidebar(){

  return(

    <div className="w-64 min-h-screen bg-gray-900 text-white p-6">

      <h2 className="text-lg font-semibold mb-8">
        Navigation
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/leads"
          className="px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Leads
        </Link>

        <Link
          to="/analytics"
          className="px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Analytics
        </Link>

      </nav>

    </div>

  );

}

export default Sidebar;