// pages/CreateBlog.js
import BlogForm from '../components/BlogForm';
import { createBlog } from '../services/blogService';
import { useBlogs } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const { token, fetchBlogs } = useBlogs();
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    await createBlog(formData, token);
    await fetchBlogs();
    navigate("/blogs");
  };

  return <BlogForm onSubmit={handleCreate} />;
};
