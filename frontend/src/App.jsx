import React, { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Dashboard from "./pages/dashBoard";

export default function App() {
  axios.defaults.withCredentials = true;

  const startServer = async () => {
    try {
      const response = await axios.get('https://hisabkisabserver-meta.vercel.app/startServer');

      console.log(response.data.message);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    startServer();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

