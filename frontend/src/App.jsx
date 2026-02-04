import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Dashboard from "./pages/dashBoard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

