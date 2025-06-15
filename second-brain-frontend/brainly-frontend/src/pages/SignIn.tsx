import { useState, useRef, RefObject } from "react";
import { Eye, EyeOff, Brain, Lightbulb, BookOpen, Zap } from "lucide-react";
import { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
// Input Component Props
interface InputProps {
  placeholder: string;
  reference: RefObject<HTMLInputElement>;
  type?: string;
  label?: string;
}

//Input Component
const Input = ({
  placeholder,
  reference,
  type = "text",
  label,
}: InputProps) => {
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
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
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

// Button Component Props
interface ButtonProps {
  onClick: () => void;
  loading: boolean;
  text: string;
  fullwidth?: boolean;
  variant?: "primary" | "secondary";
}

//Button Component
const Button = ({
  onClick,
  loading,
  text,
  fullwidth = false,
  variant = "primary",
}: ButtonProps) => {
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

// Social Button Component Props will be implementing in future
// interface SocialButtonProps {
//   icon: React.ReactNode;
//   text: string;
//   onClick: () => void;
// }

// Social Button Component
// const SocialButton = ({ icon, text, onClick }: SocialButtonProps) => (
//   <button
//     onClick={onClick}
//     className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium"
//   >
//     {icon}
//     {text}
//   </button>
// );

// logo and ui Design
const SecondBrainIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl"></div>
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
        Organize your thoughts, ideas, and knowledge in one intelligent space
      </p>
    </div>
  </div>
);

// Props fot typescript
interface SignInProps {
  onNavigate?: (screen: string) => void;
  onSignIn?: (token: string, email: string) => void;
  axiosInstance: AxiosInstance;
}

// SignIn Component
export function SignIn({ onSignIn, axiosInstance }: SignInProps) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const useremailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function inputCheck() {
    const password = passwordRef.current?.value;
    const email = useremailRef.current?.value;

    if (!password || !email) {
      alert("Please fill up all details to proceed");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/user/signin", {
        password,
        email,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        if (onSignIn) {
          onSignIn(response.data.token, email);
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        alert("No token received from server");
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      if (error.response) {
        alert(error.response.data.message || "Sign in failed!");
      } else {
        alert(error.message || "Sign in failed!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex">
      <div className="hidden lg:flex lg:w-1/2 p-8">
        <div className="w-full h-full">
          <SecondBrainIllustration />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-purple-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Log In</h2>
              <p className="text-gray-600">
                Welcome back! Please enter your details
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Email"
                placeholder="Enter your email"
                reference={useremailRef}
                type="email"
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                reference={passwordRef}
                type="password"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Forgot password?
              </button>
            </div>

            <div className="mt-6">
              <Button
                onClick={inputCheck}
                loading={loading}
                text="Log in"
                fullwidth={true}
              />
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
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
                onClick={() => alert("Google signin not implemented")}
              />
              <SocialButton
                icon={
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    f
                  </div>
                }
                text="Facebook"
                onClick={() => alert("Facebook signin not implemented")}
              /> */}
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
