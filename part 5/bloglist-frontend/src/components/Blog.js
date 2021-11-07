import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeButton, deleteButton }) => {
  const [details, setDetails] = useState(false)
  const hideWhenPressed = { display: details ? '' : 'none' }
  const showWhenPressed = { display: details ? 'none' : '' }
  const toggleVisibility = () => {
    setDetails(!details)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
  return (
    <div style={blogStyle}>
      <div style={showWhenPressed}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={hideWhenPressed}>
        <p>
          {blog.title} <button onClick={toggleVisibility}>hide</button>
        </p>
        <p>URL: {blog.url}</p>
        <p>
          No of likes: {blog.likes}{' '}
          <button value={blog.id} onClick={likeButton}>
            like
          </button>
        </p>
        <p>Author: {blog.author}</p>
        {loggedUser.username === blog.user.username   &&
          <button value={blog.id} onClick={deleteButton}>
            delete
          </button>
        }
      </div>
    </div>
  )
}

Blog.propTypes={
  blog: PropTypes.object.isRequired,
  likeButton:PropTypes.func.isRequired,
  deleteButton:PropTypes.func.isRequired,
}
export default Blog