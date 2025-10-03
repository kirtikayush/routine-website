import React, { useState } from "react";
import { auth } from "./firebase.jsx";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [buttonText, setButtonText] = useState("Sign Up");
  const [isRegistering, setIsRegistering] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleRegister = async () => {
    if (!validateEmail(email)) return alert("Enter a valid email.");
    if (!validatePassword(password))
      return alert(
        "Password must be 8+ chars, 1 uppercase, 1 number, 1 special char."
      );
    if (password !== rePassword) return alert("Passwords do not match!");

    try {
      setIsRegistering(true);
      await createUserWithEmailAndPassword(auth, email, password);

      // Clear fields & show success
      setEmail("");
      setPassword("");
      setRePassword("");
      setButtonText("✅ Registered!");

      setTimeout(() => {
        setIsRegister(false); // switch to login
        setButtonText("Sign Up"); // reset button text
      }, 2000);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert(`Logged in: ${email}`);
    } catch (error) {
      alert(error.message);
    }
  };

  // Common fields for both forms
  const fields = [
    {
      label: "Email",
      type: "text",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  if (isRegister) {
    fields.push({
      label: "Re-enter Password",
      type: "password",
      value: rePassword,
      onChange: (e) => setRePassword(e.target.value),
    });
  }

  return (
    <div className="login">
      <div className="loginBox">
        <AnimatePresence mode="wait">
          <motion.div
            key={isRegister ? "signup" : "login"}
            className="loginBox"
            initial={{ opacity: 0, x: isRegister ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRegister ? -40 : 40 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="loginText">{isRegister ? "Sign Up" : "Login"}</h1>

            {fields.map((field, idx) => (
              <input
                key={idx}
                type={field.type}
                className={field.type === "password" ? "password" : "username"}
                placeholder={`Enter ${field.label}`}
                value={field.value}
                onChange={field.onChange}
              />
            ))}

            <button
              className="loginButton"
              onClick={isRegister ? handleRegister : handleLogin}
              disabled={isRegistering}
            >
              {isRegister ? buttonText : "Login"}
            </button>

            <div className="signupQues">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="signupLink"
                    onClick={() => setIsRegister(false)}
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  Not a user?{" "}
                  <span
                    className="signupLink"
                    onClick={() => setIsRegister(true)}
                  >
                    Sign up
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;
