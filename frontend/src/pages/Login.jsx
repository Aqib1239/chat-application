import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import lottie from "lottie-web";
import animationData from "../constants/SpaceBubble.json"; // Replace with your animation file
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

  const [focusedField, setFocusedField] = useState(null);
  const animationContainer = useRef(null);


  const { login, isLoggingIn } = useAuthStore();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current, // Mount point for the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy(); // Cleanup on unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="login-container">
      <div
        ref={animationContainer}
        style={{ width: 100, height: 100, margin: "0 auto" }}
      ></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* <h2 className="text-3xl font-bold text-center">Log In</h2> */}
        <div>
          <h1 className="text-2xl font-bold mt-2 text-center">Welcome Back</h1>
          <p className="text-base-content/60 text-center ">
            Login in to your account
          </p>
        </div>
        <div className="form-control relative pb-4">
          <motion.label
            htmlFor="email"
            className="absolute left-1 bottom-10 flex pb-4 items-center gap-2 label-text font-medium  pointer-events-none"
            initial={{ y: 20, scale: 1 }}
            animate={{
              y:
                focusedField === "email" ||
                document.getElementById("email")?.value
                  ? 0
                  : 20,
              scale:
                focusedField === "email" ||
                document.getElementById("email")?.value
                  ? 0.8
                  : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="h-5 w-5 text-base-content" />
            <p>Email</p>
          </motion.label>
          <div className="relative flex">
            <input
              id="email"
              type="email"
              className="appearance-none bg-transparent border-b-2 border-gray-500 outline-none w-full pt-6 px-4 py-1 mx-1 text-base-content"
              required
              onFocus={() => setFocusedField("email")}
              onBlur={(e) => e.target.value === "" && setFocusedField(null)}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-control relative">
          <motion.label
            htmlFor="password"
            className="absolute left-1 bottom-10 flex gap-2  label-text font-medium items-center pointer-events-none"
            initial={{ y: 20, scale: 1 }}
            animate={{
              y:
                focusedField === "password" ||
                document.getElementById("password")?.value
                  ? 0
                  : 20,
              scale:
                focusedField === "password" ||
                document.getElementById("password")?.value
                  ? 0.8
                  : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Lock className="h-5 w-5 text-base-content" />
            <p>Password</p>
          </motion.label>
          <div className="relative flex">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="bg-transparent border-b-2 border-gray-500 outline-none w-full pt-8 px-4 py-1 mx-1 text-base-content"
              required
              onFocus={() => setFocusedField("password")}
              onBlur={(e) => e.target.value === "" && setFocusedField(null)}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <EyeOff className="h-5 w-5 text-base-content/50" />
              ) : (
                <Eye className="h-5 w-5 text-base-content/50" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoggingIn}
          className="btn btn-primary w-full rounded-full"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>
      {/* <div className="text-center">
        <p className="text-base-content/60">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Create account
          </Link>
        </p>
      </div> */}
    </div>
  );
}
