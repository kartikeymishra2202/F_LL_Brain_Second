import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { SignIn } from "./pages/SignIn";

import { SignUp } from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import axiosInstance from "./api/axios";
import { SidebarProvider } from "./hooks/sidebarContent";

function App() {
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
    </>
  );
}

export default App;
