import React from "react";
import Blog from "./Blog";

const allBlogs = ({ blogs, likeButton }) => {
  return (
    <div>
      {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} likeButton={likeButton} />
      ))}
    </div>
  );
};

export default allBlogs;