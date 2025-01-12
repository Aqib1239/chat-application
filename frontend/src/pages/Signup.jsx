import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../constants/SpaceBubble.json";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [focusedField, setFocusedField] = useState(null);
  const animationContainer = useRef(null);
  const [showPassword, setShowPassword] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({});

  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

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

  return (
    <div className="signup-container">
      <motion.div
        ref={animationContainer}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ width: 100, height: 100, margin: "0 auto" }}
      ></motion.div>
      <form onSubmit={handleSubmit} className="space-y-[10px]">
        <div className="text-center">
          <h1 className="text-[1.7rem] font-bold">Create Account</h1>
          <p className="text-base-content/70">
            Get started with your free account
          </p>
        </div>
        <div className="form-control relative pb-0">
          <motion.label
            htmlFor="fullName"
            className="absolute left-1 bottom-10 flex pb-[0rem] items-center gap-2 label-text font-medium  pointer-events-none"
            initial={{ y: 20, scale: 1 }}
            animate={{
              y:
                focusedField === "fullName" ||
                document.getElementById("fullName")?.value
                  ? 0
                  : 20,
              scale:
                focusedField === "fullName" ||
                document.getElementById("fullName")?.value
                  ? 0.8
                  : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <User className="h-5 w-5 text-base-content" />
            <p>Full Name</p>
          </motion.label>
          <div className="relative flex">
            <input
              id="fullName"
              type="text"
              className="appearance-none bg-transparent border-b-2 border-gray-500 outline-none w-full pt-6 px-4 py-1 mx-1 text-base-content"
              required
              onFocus={() => setFocusedField("fullName")}
              onBlur={(e) => e.target.value === "" && setFocusedField(null)}
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-control relative">
          <motion.label
            htmlFor="email"
            className="absolute left-1 bottom-10 flex pb-[0rem] items-center gap-2 label-text font-medium  pointer-events-none"
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
              className="appearance-none bg-transparent border-b-2 border-gray-500 outline-none w-full pt-8 px-4 py-1 mx-1 text-base-content"
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
            className="absolute left-1 flex pb-[0.6rem] gap-2  label-text font-medium items-center pointer-events-none"
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
              className="appearance-none bg-transparent border-b-2 border-gray-500 outline-none w-full pt-8 px-4 py-1 mx-1 text-base-content"
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
          className="btn btn-primary w-full rounded-full"
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <>
              <Loader2 className="animate-spin size-5" />
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
}
