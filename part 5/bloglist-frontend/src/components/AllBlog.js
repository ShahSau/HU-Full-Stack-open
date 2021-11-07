import React from "react";
import Blog from "./Blog";
import PropTypes from 'prop-types'
const AllBlogs = ({ blogs, likeButton, deleteButton }) => {
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
AllBlogs.propTypes={
  blogs: PropTypes.array.isRequired,
  likeButton:PropTypes.func.isRequired,
  deleteButton:PropTypes.func.isRequired,
}

export default AllBlogs;