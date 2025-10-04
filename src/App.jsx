import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { auth } from "./components/authpage/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Lazy-loaded components
// const LoginPage = lazy(() => import("./components/authpage/LoginPage"));
// const SplashScreen = lazy(() => import("./components/splash/SplashScreen"));
import SplashScreen from "./components/splash/SplashScreen";
import LoginPage from "./components/authpage/LoginPage";
const Hero = lazy(() => import("./components/hero/Hero"));
const MenuBar = lazy(() => import("./components/menubar/MenuBar"));

// Protected Route
const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="login" replace />; // relative path with basename
  return children;
};

// Hero page wrapper
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

// App component
const App = () => {
  return (
    <Router basename="/routine-website">
      <AppRoutes />
    </Router>
  );
};

// Separate component to use useLocation for splash logic
const AppRoutes = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showSplash, setShowSplash] = useState(
    location.pathname === "/" && !sessionStorage.getItem("splashShown")
  );

  // Track authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // Splash screen timeout
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("splashShown", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Show splash while active or waiting for auth check
  if (!authChecked || showSplash) {
    return (
      <Suspense fallback={<div className="loader">Loading splash...</div>}>
        <SplashScreen />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <Routes>
        {/* Root route */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="hero" replace />
            ) : (
              <Navigate to="login" replace />
            )
          }
        />

        {/* Login page */}
        <Route
          path="/login"
          element={user ? <Navigate to="hero" replace /> : <LoginPage />}
        />

        {/* Protected hero page */}
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

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
