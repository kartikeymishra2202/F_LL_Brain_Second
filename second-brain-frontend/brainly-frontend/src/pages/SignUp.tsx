import React, { useState, useRef } from "react";
import { Eye, EyeOff, Brain, Lightbulb, BookOpen, Zap } from "lucide-react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

type InputProps = {
  placeholder: string;
  reference: React.RefObject<HTMLInputElement>;
  type?: "text" | "email" | "password";
  label?: string;
};

type ButtonProps = {
  onClick: () => void;
  loading?: boolean;
  text: string;
  fullwidth?: boolean;
  variant?: "primary" | "secondary";
};

// type SocialButtonProps = {
//   icon: React.ReactNode;
//   text: string;
//   onClick: () => void;
// };

type SignUpProps = {
  onNavigate?: (page: "signin" | "signup") => void;
};

//input component
const Input: React.FC<InputProps> = ({
  placeholder,
  reference,
  type = "text",
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={reference}
          type={inputType}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-500 transition-all"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

//button component
const Button: React.FC<ButtonProps> = ({
  onClick,
  loading = false,
  text,
  fullwidth = false,
  variant = "primary",
}) => {
  const baseClasses = `${
    fullwidth ? "w-full" : "px-6"
  } py-3 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`;
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      ) : (
        text
      )}
    </button>
  );
};

//  social buTton
// const SocialButton: React.FC<SocialButtonProps> = ({ icon, text, onClick }) => (
//   <button
//     onClick={onClick}
//     className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium"
//   >
//     {icon}
//     {text}
//   </button>
// );

//Side Logo and ui
const SecondBrainIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl" />
    <div className="absolute top-20 left-20 w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center animate-pulse">
      <Brain className="text-purple-600" size={24} />
    </div>
    <div className="absolute top-40 right-16 w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center animate-bounce">
      <Lightbulb className="text-pink-600" size={20} />
    </div>
    <div className="absolute bottom-32 left-16 w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center animate-pulse">
      <BookOpen className="text-blue-600" size={22} />
    </div>
    <div className="absolute bottom-20 right-20 w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce">
      <Zap className="text-yellow-600" size={18} />
    </div>
    <div className="relative z-10 text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
        <Brain className="text-white" size={48} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Your Second Brain
      </h3>
      <p className="text-gray-600 max-w-xs mx-auto leading-relaxed">
        Organize your thoughts, ideas, and knowledge in one intelligent space.
      </p>
    </div>
  </div>
);

//Sign up here
export const SignUp: React.FC<SignUpProps> = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const useremailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const inputCheck = async () => {
    const name = usernameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const email = useremailRef.current?.value.trim();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/api/v1/user/signup", {
        name,
        email,
        password,
      });
      alert("Sign up successful!");
      navigate("/signin");
    } catch (error: any) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex">
      <div className="hidden lg:flex lg:w-1/2 p-8">
        <SecondBrainIllustration />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-purple-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">Join your second brain community</p>
            </div>

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              reference={usernameRef}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              reference={useremailRef}
              type="email"
            />
            <Input
              label="Password"
              placeholder="Create a password"
              reference={passwordRef}
              type="password"
            />

            <div className="mt-6">
              <Button
                onClick={inputCheck}
                loading={loading}
                text="Create Account"
                fullwidth
              />
            </div>

            <div className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Sign In
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* <SocialButton
                icon={
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>
                }
                text="Google"
                onClick={() => alert("Google sign-up not yet setup.")}
              />
              <SocialButton
                icon={
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    f
                  </div>
                }
                text="Facebook"
                onClick={() => alert("Facebook sign-up not yet setup.")}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
