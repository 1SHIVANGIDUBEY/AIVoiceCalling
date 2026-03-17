import { useState } from "react";
import { Link } from "react-router-dom";

function Register(){

  const [form,setForm] = useState({
    jobId:"",
    name:"",
    designation:"",
    username:"",
    password:""
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();

    console.log(form);

    alert("Registration Successful (Demo)");
  };

  return(

    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="relative bg-black p-10 rounded-2xl shadow-2xl w-[420px] text-white border border-purple-500">

        <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl animate-pulse pointer-events-none"></div>

        <h1 className="text-3xl font-bold text-center mb-2 text-purple-400">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Register to access CRM
        </p>

        <form onSubmit={handleSubmit}>

          <input
            name="jobId"
            placeholder="Job ID"
            className="w-full p-3 bg-gray-900 border border-purple-500 rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-3 bg-gray-900 border border-purple-500 rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            name="designation"
            placeholder="Designation"
            className="w-full p-3 bg-gray-900 border border-purple-500 rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            name="username"
            placeholder="Username"
            className="w-full p-3 bg-gray-900 border border-purple-500 rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-900 border border-purple-500 rounded-lg mb-6"
            onChange={handleChange}
          />

          <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
            Register
          </button>

        </form>

        <p className="text-center text-sm text-gray-400 mt-6">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-purple-400 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;