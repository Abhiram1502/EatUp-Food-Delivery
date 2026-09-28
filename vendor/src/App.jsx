import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import VendorLogin from "./components/VendorLogin";
import VendorDashboard from "./components/VendorDashboard";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light"/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<VendorLogin />} />
        <Route path="/dashboard" element={<VendorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;