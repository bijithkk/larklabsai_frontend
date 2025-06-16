import React from "react";
import styles from "./Blogs.module.css";
import { useBlogs } from "../context/BlogContext";
import { Link } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";

const Blogs = () => {
  const { blogs, loading, error,setError  } = useBlogs();

  if (loading) return <LoadingSpinner/>
  return (
    <div className={styles.container}>
      {error && (
        <ErrorShow 
          message={error} 
          onClose={() => setError(null)} // Clear error when closed
        />
      )}
      {/* First Card */}
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog._id}`} key={blog._id} className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.authorSection}>
              {/* <div sclassNametyle={styles.avatar}></div> */}
              <span className={styles.authorName}>{blog.author.name}</span>
            </div>

            <div href="#" className={styles.title}>
              {blog.title}
            </div>

            <p className={styles.subtitle}>
              {blog.content}
            </p>

            <div className={styles.metaInfo}>
              <div className={styles.dateReads}>
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short", // "Jun"
                    day: "numeric", // "9"
                  })}
                </span>

                <span>👏</span>
                <span>25</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.actionButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </button>
                <button className={styles.actionButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </button>
                <button className={styles.actionButton}>⋯</button>
              </div>
            </div>
          </div>

        </Link >
      ))}
    </div>
  );
};

export default Blogs;
