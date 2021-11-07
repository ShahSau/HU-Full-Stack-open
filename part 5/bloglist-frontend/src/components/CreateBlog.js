import React from "react";
import PropTypes from 'prop-types'

const BlogFrom = ({
  addBlog,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  toggleVisibility
}) => {
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="URL"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" onChange={toggleVisibility}>create</button>
        
      </form>
    </div>
  );
};

BlogFrom.prototypes={
  addBlog: PropTypes.func.isRequired,
  title:PropTypes.string.isRequired,
  author:PropTypes.string.isRequired,
  url:PropTypes.string.isRequired,
  handleTitleChange:PropTypes.func.isRequired,
  handleAuthorChange:PropTypes.func.isRequired,
  handleUrlChange:PropTypes.func.isRequired,
  toggleVisibility:PropTypes.func.isRequired,
}

export default BlogFrom;