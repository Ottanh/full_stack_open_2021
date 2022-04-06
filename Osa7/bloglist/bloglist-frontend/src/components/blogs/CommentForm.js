import React from 'react';
import { useState } from 'react';
import blogService from '../../services/blogs';
import { putBlog } from '../../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addComment = async (event) => {
    event.preventDefault();
    const newComment = { content: comment };
    const blogWithComment = await blogService.addComment(newComment, id);
    dispatch(putBlog(blogWithComment));
    setComment('');
  };

  return (
    <form onSubmit={addComment}>
      <div>
        <input value={comment} id="comment" onChange={handleCommentChange} />
        <button id="submit" type="submit">
          add comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
