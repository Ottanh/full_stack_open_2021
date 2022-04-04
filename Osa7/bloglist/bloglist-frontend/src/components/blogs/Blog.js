import React, { useState } from 'react';
import blogService from '../../services/blogs';
import { putBlog, removeBlog } from '../../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = async (event) => {
    event.preventDefault();
    const updatedBlog = await blogService.update(
      { likes: blog.likes + 1 },
      blog.id
    );
    dispatch(putBlog(updatedBlog));
  };

  const deleteBlog = async () => {
    if (window.confirm(`Delete ${blog.title}`)) {
      await blogService.deleteBlog(blog.id);
      dispatch(removeBlog(blog.id));
    }
  };

  const deleteButton = () => {
    if (blog.user !== null && blog.user.username === user.username) {
      return (
        <button
          onClick={() => {
            deleteBlog();
          }}
        >
          Delete
        </button>
      );
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} id="blogDetails">
        <p>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button> <br />
          {blog.author} <br />
          {blog.url} <br />
          Likes {blog.likes}
          <button onClick={addLike}>Like</button>
        </p>

        {deleteButton()}
      </div>
    </div>
  );
};

export default Blog;
