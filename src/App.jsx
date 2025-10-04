import React, { useEffect, useState } from "react";
import MenuBar from "./components/menubar/MenuBar";
import Hero from "./components/hero/Hero";
import LoginPage from "./components/authpage/LoginPage";
import SplashScreen from "./components/splash/SplashScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./components/authpage/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// 🔒 Protected Route Component
const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // ✅ Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Control splash visibility
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Wait for auth check & splash to complete
  if (!authChecked || showSplash) return <SplashScreen />;

  return (
    <Router>
      <Routes>
        {/* 🏠 Public Route */}
        <Route
          path="/"
          element={user ? <Navigate to="/hero" replace /> : <LoginPage />}
        />

        {/* 🔐 Protected Route */}
        <Route
          path="/hero"
          element={
            <ProtectedRoute user={user}>
              <HeroBody
                onLogout={() => signOut(auth)}
                userEmail={user?.email}
              />
            </ProtectedRoute>
          }
        />

        {/* 🚫 Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const HeroBody = ({ onLogout, userEmail }) => {
  return (
    <div>
      <MenuBar onLogout={onLogout} />

      <div style={{ textAlign: "center", marginTop: "20px", color: "#64748b" }}>
        <p>
          Logged in as: <strong>{userEmail}</strong>
        </p>
      </div>
      <Hero />
    </div>
  );
};

export default App;
