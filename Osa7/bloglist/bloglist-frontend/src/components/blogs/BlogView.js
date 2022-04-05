import React from 'react';

import Togglable from '../Togglable';
import BlogForm from './Blogform';
import BlogList from './BlogList';

const BlogView = ({ blogFormRef, createBlog, user }) => {
  return (
    <div>
      <Togglable buttonLabel="Create blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <BlogList user={user} />
    </div>
  );
};

export default BlogView;
