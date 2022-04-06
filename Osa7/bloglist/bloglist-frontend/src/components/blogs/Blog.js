import React from 'react';
import blogService from '../../services/blogs';
import { putBlog, removeBlog } from '../../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import styled from 'styled-components';

const StyledList = styled.ul`
  padding-left: 20px;
  list-style-type: circle;
`;

const Blog = ({ user }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  let blog = useSelector((state) => {
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
        added by {blog.user.name} {deleteButton()}
      </p>
      <h2>comments</h2>
      <CommentForm id={blog.id} />
      <StyledList>
        {blog.comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </StyledList>
    </div>
  );
};

export default Blog;
