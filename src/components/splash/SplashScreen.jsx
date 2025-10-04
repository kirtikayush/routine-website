import React from "react";
import { motion } from "framer-motion";
import "./SplashScreen.css";

const SplashScreen = () => {
  return (
    <motion.div
      className="splash-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* <motion.div
        className="splash-logo"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      ></motion.div> */}

      <motion.h1
        className="splash-text"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Routine <span>Website</span>
      </motion.h1>

      <motion.h1
        className="splash-slogan"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        Helping to making routine tracking fun
      </motion.h1>
    </motion.div>
  );
};

export default SplashScreen;
