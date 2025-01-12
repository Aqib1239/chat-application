import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import LogoAnimation from "../constants/SpaceBubble.json"

const NoChatSelected = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    // Load the Lottie animation dynamically based on `isLogin` state
    const anim = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: LogoAnimation,
    });

    return () => anim.destroy(); // Cleanup on unmount or when `isLogin` changes
  }, []);
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              {/* <MessageSquare className="w-8 h-8 text-primary " /> */}
              {/* Lottie Animation */}
              <motion.div
                ref={animationContainer}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                  width: "300px",
                  height: "300px",
                }}
              ></motion.div>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to QuickTalk !</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;