import React, { useState } from "react";
import styles from "./Signup.module.css";
import { IoMdClose } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { useBlogs } from "../context/BlogContext";
import { signup, signin } from "../services/blogService";
import { useNavigate } from "react-router-dom";

const Signup = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useBlogs();

  const handleSubmit = async () => {
  try {
    let res;

    if (isSignIn) {
      res = await signin({ email, password });
    } else {
      res = await signup({ name, email, password });
    }

    const { accessToken, user } = res.data;
    login(accessToken, user);
    onClose();
    navigate("/blogs");
  } catch (error) {
    console.error("Auth error:", error.response?.data?.message || error.message);
  }
};


  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <IoMdClose size={20} />
        </button>

        <div className={styles.iconContainer}>
          <CiMail className={styles.icon} />
        </div>

        <h2 className={styles.title}>
          {isSignIn ? "Sign in to your account" : "Sign up with email"}
        </h2>

        <div className={styles.form}>
          {!isSignIn && (
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
            Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="button" className={styles.button} onClick={handleSubmit}>
            {isSignIn ? "Sign in" : "Create account"}
          </button>
        </div>

        <p className={styles.signInText}>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className={styles.signInLink}
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
