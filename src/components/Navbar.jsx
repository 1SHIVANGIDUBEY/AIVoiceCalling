import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (

    <div className="w-full bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold tracking-wide">
        AI Voice CRM
      </h1>

      <div className="flex items-center gap-6">

        <span className="text-gray-600 text-sm">
          Admin Panel
        </span>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-md hover:shadow-lg transition"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;