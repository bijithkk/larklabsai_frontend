import React, { useState } from 'react'
import styles from './BlogNavbar.module.css'
import { CiSearch } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { GoBell } from "react-icons/go";
import { useBlogs } from '../../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs } from '../../services/blogService';
import Signup from '../Signup';

const BlogNavbar = () => {
   const { logout,token,setBlogs  } = useBlogs();
   const [isSignupOpen, setIsSignupOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const navigate = useNavigate();

   const handleLogout = () => {
    logout();           
    navigate('/');      
  };

  const handleSearch = async () => {
    try {
      const response = await getAllBlogs(searchTerm); // calling updated API 
      setBlogs(response.data.data); // update blog list in context or state
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
    <div className={styles.navcontainer}>
      <div className={styles.leftcontent}>
        <h1 onClick={() => navigate('/blogs')} className={styles.logo}>Medium</h1>
        <div className={styles.searchcontainer}>
            <CiSearch/>
            <input type="text" placeholder='search'value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress}/>
        </div>
      </div>
      <div className={styles.rightcontent}>
        <ul className={styles.navLinks}>
            {token ? <li onClick={() => navigate("/newblog")}><TfiWrite/> Write</li> : ""}
            <li><GoBell size={20}/></li>
            {token ? <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li> : <li onClick={() => setIsSignupOpen(true)} style={{ cursor: 'pointer' }}>Login</li>}
        </ul>
      </div>
    </div>
    
      {/* Signup/Login Dialog */}
      <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  )
}

export default BlogNavbar
