import { useRef } from "react";
import { Input } from "../components/CreateContentModal";
import { Button } from "../components/ui/Button";
import axiosInstance from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const useremailRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function inputCheck() {
    const name = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = useremailRef.current?.value;

    if (!name || !password || !email) {
      alert("Please Fill Up All Detail to proceed");
      return;
    }

    try {
      console.log("Attempting to sign up with:", { email, name });
      await axiosInstance.post("/api/v1/user/signup", {
        name,
        password,
        email,
      });

      alert("Sign up successful! Please sign in.");
      navigate("/signin");
    } catch (error) {
      console.error("Error signing up:", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("Server response:", error.response.data);
          alert(error.response.data.message || "Sign up failed!");
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("No response from server. Please check your connection.");
        } else {
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
              <i>Sign Up</i>
            </b>{" "}
            👋, <i>To Get started</i>
          </h1>
        </div>
        <div className="bg-black rounded-2xl border border-gray-700  p-10 h-screen fixed top-0 right-0">
          <h1 className="text-white p-3">
            <div className="flex justify-center">
              {" "}
              <b> New User? </b>
            </div>
            <div className="flex justify-center">
              <p className="bg-gradient-to-l from-cyan-500    px-2 py-1  rounded-lg">
                {" "}
                SignUp First To Get Started.
              </p>
            </div>
          </h1>
          <div className="pt-3 w-72 ">
            <Input placeholder="User Name" reference={usernameRef} />

            <Input placeholder="email Name" reference={useremailRef} />
            <Input placeholder="Password" reference={passwordRef} />
          </div>
          <div className="flex justify-center pt-4 text-center">
            <Button
              onClick={inputCheck}
              loading={false}
              varient="primary"
              size="sm"
              text="Sign Up"
              fullwidth={true}
            />
          </div>
          <div className="flex justify-center text-white">
            Existing User?{" "}
            <Link to="/signin">
              {" "}
              {"  "}
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
