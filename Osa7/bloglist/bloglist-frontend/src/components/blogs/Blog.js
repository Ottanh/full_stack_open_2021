import React from 'react';
import blogService from '../../services/blogs';
import { putBlog, removeBlog } from '../../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Blog = ({ user }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id === id);
  });
  if (!blog) {
    return null;
  }

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
      return <button onClick={deleteBlog}>Delete</button>;
    }
  };

  return (
    <div id="blogDetails">
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url} target="blank">
          {blog.url}
        </a>
        <br />
        Author: {blog.author} <br />
        Likes: {blog.likes}
        <button onClick={addLike}>Like</button> <br />
      </p>
      <p>added by {blog.user.name}</p>
      {deleteButton()}
    </div>
  );
};

export default Blog;
