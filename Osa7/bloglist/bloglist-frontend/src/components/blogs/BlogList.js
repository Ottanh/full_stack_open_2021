import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: black;
  font-weight: normal;
  padding-right: 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledBlogContainer = styled.div`
  padding-top: 10;
  padding-left: 2;
  margin-bottom: 5px;
  padding: 5px;
  display: block;
`;

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <StyledBlogContainer key={blog.id}>
          <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
        </StyledBlogContainer>
      ))}
    </div>
  );
};

export default BlogList;
