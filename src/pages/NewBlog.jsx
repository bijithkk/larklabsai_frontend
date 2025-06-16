import React, { useEffect, useState } from "react";
import styles from "./NewBlog.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";
import { createBlog, updateBlog, getBlogById } from "../services/blogService";
import LoadingSpinner from "../components/LoadingSpinner";

const NewBlog = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [existingImage, setExistingImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: null,
  });
  const { token, fetchBlogs } = useBlogs();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const res = await getBlogById(id);
        setFormData({
          title: res.data.blog.title,
          content: res.data.blog.content,
          coverImage: null, // you can keep it null; uploading new one will replace
        });
        setExistingImage(res.data.blog.coverImage);
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("content", formData.content);
    if (formData.coverImage) blogData.append("coverImage", formData.coverImage);

    try {
      if (id) {
        await updateBlog(id, blogData, token);
      } else {
        await createBlog(blogData, token);
      }
      await fetchBlogs();
      navigate("/blogs");
    } catch (err) {
      console.error("Blog error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      content: "",
      coverImage: null,
    });
  };

  if (loading) return <LoadingSpinner/>;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>{isEdit ? "Update Blog" : "New Blog"}</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              className={styles.textarea}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Upload Cover Image</label>
            {/* Show existing image if not replaced */}
            {isEdit && existingImage && !formData.coverImage && (
              <div className={styles.imagePreview}>
                <p>Current Image:</p>
                <img
                  src={existingImage}
                  alt="Current Cover"
                  className={styles.previewImage}
                />
              </div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.fileInput}
              accept="image/*"
            />
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.createButton}`}
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBlog;
