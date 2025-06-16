import React, { useEffect, useState } from "react";
import styles from "./BlogDetail.module.css";
import { useParams } from "react-router-dom";
import { getBlogById,deleteBlog  } from "../services/blogService";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { fetchBlogs } = useBlogs();
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res.data.blog);
      } catch (err) {
        console.log("error", err);
        setError("Blog not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to delete a blog.");
    return;
  }

  try {
    await deleteBlog(blog._id, token);
    await fetchBlogs();
    alert("Blog deleted successfully.");
    navigate("/blogs"); // redirect to homepage or blog list
  } catch (error) {
    console.error("Error deleting blog:", error);
    alert("Failed to delete blog. Please try again.");
  }
};


  if (loading) return <LoadingSpinner/>
  if (error || !blog) return <p>{error}</p>;

  return (
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.imageContainer}>
            {!imgError && blog.coverImage ? (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className={styles.image}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className={styles.imagePlaceholder}>Blog Image</div>
            )}
          </div>

          <div className={styles.contentContainer}>
            <h1 className={styles.title}>{blog.title}</h1>

            <div className={styles.meta}>
              <span className={styles.author}>By {blog.author.name}</span>
              <span>•</span>
              <span className={styles.date}>
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.content}>
              {blog.content.split("\n").map((para, idx, arr) => (
                <p
                  key={idx}
                  className={
                    idx === arr.length - 1
                      ? styles.lastParagraph
                      : styles.paragraph
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.buttonSection}>
            <button onClick={() => navigate(`/blogs/edit/${blog._id}`)}>Update</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
  );
};

export default BlogDetail;
