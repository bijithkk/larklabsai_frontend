import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllBlogs } from '../services/blogService';

const BlogContext = createContext();

export const useBlogs = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllBlogs();
      setBlogs(res.data.data); 
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs,setBlogs, loading, error, fetchBlogs, token, user, login, logout }}>
      {children}
    </BlogContext.Provider>
  );
};
