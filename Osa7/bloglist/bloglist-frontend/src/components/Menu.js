import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: #add8e6;
  font-weight: bold;
  padding-right: 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledMenuContainer = styled.div`
  background-color: #696969;
  border-radius: 5px;
  display: inline-block;
  padding: 5px;
  margin-bottom: 5px;
`;

const StyledText = styled.div`
  color: #add8e6;
  display: inline-block;
  padding-right: 5px;
`;

const Menu = ({ user, logout }) => {
  return (
    <div>
      <StyledMenuContainer>
        <StyledLink fontWeight="bold" color="#ADD8E6" to="/">
          Blogs
        </StyledLink>
        <StyledLink fontWeight="bold" color="#ADD8E6" to="/users">
          Users
        </StyledLink>
        <StyledText>{user.name} logged in </StyledText>
        <button onClick={logout}>Logout</button>
      </StyledMenuContainer>
    </div>
  );
};

export default Menu;
