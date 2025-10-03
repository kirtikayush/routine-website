import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [dayProgress, setDayProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(""); // ✅ add this

  // useEffect(() => {
  //   const updateProgress = () => {
  //     const now = new Date();
  //     const secondsPassed =
  //       now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  //     const totalSecondsInDay = 24 * 3600;
  //     const progress = (secondsPassed / totalSecondsInDay) * 100;
  //     setDayProgress(progress);

  //     // Format time as HH:MM
  //     const hours = now.getHours().toString().padStart(2, "0");
  //     const minutes = now.getMinutes().toString().padStart(2, "0");
  //     setCurrentTime(`${hours}:${minutes}`);
  //   };

  //   updateProgress(); // initial call
  //   const interval = setInterval(updateProgress, 1000); // update every second
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="hero">
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ height: `${dayProgress}%` }}
          ></div>
        </div>
        {/* <div className="time-label">{currentTime}</div> */}
      </div>

      <div className="heroContent">
        <div className="button">
          <button className="heroButton">Get Started</button>
          <button className="heroButton">Learn More</button>
        </div>
        <div className="heroBody"></div>
      </div>
    </div>
  );
};

export default Hero;
