import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input value={newTitle} id="title" onChange={handleTitleChange} />
      </div>
      <div>
        Author:
        <input value={newAuthor} id="author" onChange={handleAuthorChange} />
      </div>
      <div>
        URL:
        <input value={newUrl} id="url" onChange={handleUrlChange} />
      </div>
      <div>
        <button id="submit" type="submit">
          Create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
