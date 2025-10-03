import React from "react";
import MenuBar from "./components/menubar/MenuBar";
import Hero from "./components/hero/Hero";
import LoginPage from "./components/authpage/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* <MenuBar />
      <Hero /> */}
      <LoginPage />
    </div>
  );
};

export default App;
