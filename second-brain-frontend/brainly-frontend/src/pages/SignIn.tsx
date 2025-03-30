import { useRef } from "react";
import { Input } from "../components/CreateContentModal";
import { Button } from "../components/ui/Button";
import { Backend_Url } from "../config";
import axiosInstance from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export function SignIn() {
  const passwordRef = useRef<HTMLInputElement>();
  const useremailRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function inputCheck() {
    const password = passwordRef.current?.value;
    const email = useremailRef.current?.value;
    if (!password || !email) alert("Please Fill Up All Detail to proceed");
    else {
      try {
        const response = await axiosInstance.post("/api/v1/user/signin", {
          password,
          email,
        });
        const jwt = response.data.token;

        localStorage.setItem("token", jwt);
        navigate("/dashboard");

        alert("SignIn");
      } catch (error) {
        console.error("Error signing in:", error);
        alert("SignIn failed!");
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
