import LoginForm from "../pages/Login";
import SignupForm from "../pages/Signup";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";
import loginAnimation from "../constants/SpaceBubble.json"; // Replace with your login animation file
import signupAnimation from "../constants/SpaceBubble.json"; // Replace with your signup animation file

export default function AuthSlide() {
  const [isLogin, setIsLogin] = useState(true);
  const animationContainer = useRef(null);

  const toggleForm = () => setIsLogin(!isLogin);

  useEffect(() => {
    // Load the Lottie animation dynamically based on `isLogin` state
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: isLogin ? loginAnimation : signupAnimation,
    });

    return () => anim.destroy(); // Cleanup on unmount or when `isLogin` changes
  }, [isLogin]);

  return (
    <div className="flex justify-center bg-base-transparent items-center w-full py-[124px] px-20 rounded-2xl">
      {/* Form side */}
      <div
        className={`w-full md:w-1/2 flex items-center justify-center p-8 ${
          isLogin ? "order-2" : "order-1"
        }`}
      >
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ x: isLogin ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isLogin ? -300 : 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {isLogin ? <LoginForm /> : <SignupForm />}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              className="mt-2 text-center"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <button onClick={toggleForm}>
                {isLogin ? (
                  <div className="flex gap-2 text-base-content/60">
                    <p>Don't have an account?</p>
                    <button className="link link-primary font-semibold">
                      Sign up
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 text-base-content/60">
                    <p>Already have an account?</p>
                    <button className="link link-primary font-semibold">
                      Log in
                    </button>
                  </div>
                )}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Welcome message side */}
      <div
        className={`hidden md:flex flex-col md:w-1/2 bg-primary bg-opacity-40 rounded-2xl text-primary-content items-center justify-center ${
          isLogin ? "order-1" : "order-2"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login-message" : "signup-message"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-center p-12"
          >
            <h1 className="text-4xl font-bold mb-2">
              {isLogin ? "Welcome Back!" : "Join our community"}
            </h1>
            <p className="text-xl">
              {isLogin ? (
                <div>
                  <p>
                    Sign in to continue your conversations and catch up with
                    your messages.
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    Connect with friends, share moments and stay in touch with
                    your loved ones.
                  </p>
                </div>
              )}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Lottie Animation */}
        <motion.div
          ref={animationContainer}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            width: "300px",
            height: "300px",
          }}
        ></motion.div>
      </div>
    </div>
  );
}
