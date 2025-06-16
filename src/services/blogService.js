import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllBlogs = (search = "") =>
  axios.get(`${API_BASE_URL}/blog/get`, {
    params: {
      search,
    },
  });

export const signup = (userData) =>
  axios.post(`${API_BASE_URL}/auth/register`, userData);

export const signin = (userData) =>
  axios.post(`${API_BASE_URL}/auth/login`, userData);

export const createBlog = (data, token) =>
  axios.post(`${API_BASE_URL}/blog/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getBlogById = (id) =>
  axios.get(`${API_BASE_URL}/blog/get/${id}`);

export const updateBlog = (id, data, token) =>
  axios.patch(`${API_BASE_URL}/blog/update/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteBlog = (id, token) =>
  axios.delete(`${API_BASE_URL}/blog/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
