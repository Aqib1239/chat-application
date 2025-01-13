import React, { useEffect, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import Lottie from 'lottie-web';
import LogoAnimation from '../constants/SpaceBubble.json'
import { motion } from 'framer-motion';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
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
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-[74px]">
        <div className="flex items-center justify-between h-full px-2">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-14 bg-primary/10 rounded-lg flex items-center justify-center">
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
              <h1 className="text-xl font-bold">QuickTalk</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm rounded-full gap-2 transition-colors`}
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm rounded-full gap-2`}>
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 rounded-full bg-red-500 px-3 py-1 items-center" onClick={logout}>
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
