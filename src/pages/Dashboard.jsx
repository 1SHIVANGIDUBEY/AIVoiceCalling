import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard(){

  const [data,setData] = useState([]);
  const [template,setTemplate] = useState("");

  const uploadCSV = (e)=>{

    const file = e.target.files[0];

    // Send file to backend
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/upload-leads",{
      method:"POST",
      body:formData
    });

    // Local preview (your existing logic)
    const reader = new FileReader();

    reader.onload = (event)=>{

      const text = event.target.result;
      const rows = text.split("\n").map(r=>r.split(","));

      const headers = rows[0];

      const formatted = rows.slice(1).map(row=>{
        let obj={};

        headers.forEach((h,i)=>{
          obj[h.trim()] = row[i];
        });

        return obj;
      });

      setData(formatted);
    };

    reader.readAsText(file);
  };



  const startCampaign = async ()=>{

    if(!template){
      alert("Enter message template");
      return;
    }

    await fetch("http://localhost:5000/start-campaign",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        template:template
      })
    });

    alert("WhatsApp Campaign Started");

  };



  return(

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-8">

          <h1 className="text-2xl font-semibold mb-6">
            Dashboard
          </h1>

          {/* Stats */}

          <div className="grid grid-cols-4 gap-6 mb-8">

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">
                Total Leads
              </h3>
              <p className="text-2xl font-bold">
                {data.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">
                Calls Today
              </h3>
              <p className="text-2xl font-bold">
                120
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">
                Conversions
              </h3>
              <p className="text-2xl font-bold">
                34
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">
                Success Rate
              </h3>
              <p className="text-2xl font-bold">
                28%
              </p>
            </div>

          </div>



          {/* CSV Upload */}

          <div className="bg-white p-6 rounded-lg shadow mb-8">

            <h2 className="font-semibold mb-4">
              Upload Leads CSV
            </h2>

            <input
              type="file"
              accept=".csv"
              onChange={uploadCSV}
              className="border p-2 rounded"
            />

          </div>



          {/* WhatsApp Campaign */}

          <div className="bg-white p-6 rounded-lg shadow mb-8">

            <h2 className="font-semibold mb-4">
              WhatsApp Campaign
            </h2>

            <input
              type="text"
              placeholder="Message template (example: Hi {name}, thanks for your interest)"
              value={template}
              onChange={(e)=>setTemplate(e.target.value)}
              className="border p-3 rounded w-full mb-4"
            />

            <button
              onClick={startCampaign}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Start WhatsApp Campaign
            </button>

          </div>



          {/* Leads Table */}

          {data.length > 0 && (

            <div className="bg-white rounded-lg shadow overflow-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>
                    {Object.keys(data[0]).map(key=>(
                      <th key={key} className="p-3 text-left border-b">
                        {key}
                      </th>
                    ))}
                  </tr>

                </thead>

                <tbody>

                  {data.map((row,i)=>(
                    <tr key={i} className="hover:bg-gray-50">

                      {Object.values(row).map((val,j)=>(
                        <td key={j} className="p-3 border-b">
                          {val}
                        </td>
                      ))}

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;