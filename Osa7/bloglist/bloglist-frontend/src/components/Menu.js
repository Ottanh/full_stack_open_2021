import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ user, logout }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {user.name} logged in
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Menu;
