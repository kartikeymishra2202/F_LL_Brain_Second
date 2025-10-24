import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { SignIn } from "./pages/SignIn";
import { Toaster } from "react-hot-toast";

import { SignUp } from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

import { SidebarProvider } from "./hooks/sidebarContent";
import { useEffect } from "react";
import axiosInstance from "./api/axios";

function App() {
  useEffect(() => {
    console.log("Warming up Second-Brain server...");
    fetch("https://f-ll-brain-second.onrender.com", { method: "GET" }).catch(
      () => {
        console.log("Server warm-up ping is done.");
      }
    );
  }, []);
  return (
    <>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route
              path="/signin"
              element={<SignIn axiosInstance={axiosInstance} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
