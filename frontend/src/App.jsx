import React, { useState, useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import Login from "./components/dashboard/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Finished checking
  }, []);

  // Show a blank screen or a spinner while checking localStorage
  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#0b0e11] flex items-center justify-center">
        <div className="text-yellow-500 font-mono animate-pulse">INITIALIZING X-TRADE...</div>
      </div>
    );
  }

  const handleLogout = () =>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  }

  return (
    <div className="min-h-screen bg-[#0b0e11]">
      {isAuthenticated ? (
        <MainLayout onLogout={handleLogout}/>
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;