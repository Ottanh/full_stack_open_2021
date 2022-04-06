import React from 'react';

import Togglable from '../Togglable';
import BlogForm from './Blogform';
import BlogList from './BlogList';

const BlogView = ({ blogFormRef, createBlog, user }) => {
  return (
    <div>
      <BlogList user={user} />
      <Togglable buttonLabel="Create blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    </div>
  );
};

export default BlogView;
