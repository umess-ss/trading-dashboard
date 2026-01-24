import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      onLoginSuccess(); // Tell App.jsx we are logged in
    } catch (err) {
      alert("Login Failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-[#161a1e] p-8 rounded border border-gray-800 w-80">
        <h2 className="text-yellow-500 font-bold text-xl mb-4">X-TRADE LOGIN</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 bg-[#0b0e11] border border-gray-700 text-white rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-5 bg-[#0b0e11] border border-gray-700 text-white rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-yellow-500 text-black font-bold p-2 rounded">
          ENTER TERMINAL
        </button>
      </form>
    </div>
  );
}