import { useRef } from "react";
import { Input } from "../components/CreateContentModal";
import { Button } from "../components/ui/Button";
import axiosInstance from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Backend_Url } from "../config";

export function SignIn() {
  const passwordRef = useRef<HTMLInputElement>();
  const useremailRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function checkBackendConnection() {
    try {
      const response = await fetch(Backend_Url);
      return response.ok;
    } catch (error) {
      console.error("Backend connection check failed:", error);
      return false;
    }
  }

  async function inputCheck() {
    const password = passwordRef.current?.value;
    const email = useremailRef.current?.value;
    if (!password || !email) {
      alert("Please Fill Up All Detail to proceed");
      return;
    }

    try {
      // First check if backend is accessible
      const isBackendAvailable = await checkBackendConnection();
      if (!isBackendAvailable) {
        alert(
          "Cannot connect to server. Please check if the server is running."
        );
        return;
      }

      console.log("Attempting to sign in with:", { email });
      const response = await axiosInstance.post("/api/v1/user/signin", {
        password,
        email,
      });

      console.log("Sign in response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        alert("No token received from server");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server response:", error.response.data);
          alert(error.response.data.message || "Sign in failed!");
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          alert("No response from server. Please check your connection.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Request setup error:", error.message);
          alert("Error: " + error.message);
        }
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred");
      }
    }
  }
  return (
    <>
      <div className="h-screen w-screen bg-indigo-200 flex ">
        <div className=" fixed h-screen flex w-full justify-center align-middle items-center  mr-80 bg-black ">
          {/* <img src={logo} width="100%" height="100%" /> */}
          <h1 className="text-6xl text-gray-400 ">
            <b>
              <i>Welcome Back</i>
            </b>{" "}
            👋, <i>Buddy </i>
          </h1>
        </div>
        <div className="bg-black rounded-2xl border border-gray-700  p-10 h-screen fixed top-0 right-0">
          <h1 className="text-white p-3">
            <div className="flex justify-center">
              {" "}
              <b> Existing User? </b>
            </div>
            <div className="flex justify-center">
              <p className="bg-gradient-to-l from-cyan-500    px-2 py-1  rounded-lg">
                {" "}
                SignIn First To Get Started.
              </p>
            </div>
          </h1>
          <div className="pt-3 w-72 ">
            <Input placeholder="email Name" reference={useremailRef} />
            <Input placeholder="Password" reference={passwordRef} />
          </div>
          <div className="flex justify-center pt-4 text-center">
            <Button
              onClick={inputCheck}
              loading={false}
              varient="primary"
              size="sm"
              text="Sign In"
              fullwidth={true}
            />
          </div>
          <div className="flex justify-center text-white">
            New User?{" "}
            <Link to="/">
              {" "}
              {"  "}
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
