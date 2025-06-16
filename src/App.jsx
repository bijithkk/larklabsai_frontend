import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes, useLocation  } from "react-router-dom";
import BlogNavbar from "./components/Blogs/BlogNavbar";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import NewBlog from "./pages/NewBlog";

const App = () => {
  const location = useLocation();

  const isBlogRoute = location.pathname.startsWith("/blogs") || location.pathname === "/newblog" || location.pathname === "/blog";
  
  return (
    <div>
      {isBlogRoute ? <BlogNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/newblog" element={<NewBlog />} />
        <Route path="/blogs/edit/:id" element={<NewBlog />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
