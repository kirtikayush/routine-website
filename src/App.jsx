import React, { useEffect, useState, lazy, Suspense } from "react";
const LoginPage = lazy(() => import("./components/authpage/LoginPage"));
const Hero = lazy(() => import("./components/hero/Hero"));
const MenuBar = lazy(() => import("./components/menubar/MenuBar"));
const SplashScreen = lazy(() => import("./components/splash/SplashScreen"));
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./components/authpage/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { div } from "framer-motion/client";

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
    <Suspense fallback={<div className="loader">Loading...</div>}>
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
    </Suspense>
  );
};

const HeroBody = ({ onLogout, userEmail }) => {
  return (
    <div>
      <Suspense fallback={<div className="loader">Loading menu...</div>}>
        <MenuBar onLogout={onLogout} />
      </Suspense>

      <div style={{ textAlign: "center", marginTop: "20px", color: "#64748b" }}>
        <p>
          Logged in as: <strong>{userEmail}</strong>
        </p>
      </div>

      <Suspense fallback={<div className="loader">Loading hero...</div>}>
        <Hero />
      </Suspense>
    </div>
  );
};

export default App;
