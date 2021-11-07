import React from "react";
import Blog from "./Blog";

const allBlogs = ({ blogs, likeButton, deleteButton }) => {
  return (
    <div>
      {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} likeButton={likeButton} deleteButton={deleteButton}/>
      ))}
    </div>
  );
};

export default allBlogs;