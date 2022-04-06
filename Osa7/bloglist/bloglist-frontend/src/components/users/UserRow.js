import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCell = styled.td`
  text-align: center;
`;

const UserRow = ({ user }) => {
  return (
    <tr>
      <StyledCell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </StyledCell>
      <StyledCell>{user.blogs.length}</StyledCell>
    </tr>
  );
};

export default UserRow;
