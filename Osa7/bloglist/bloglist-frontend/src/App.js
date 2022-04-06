import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/users/Loginform';
import Notification from './components/Notification';
import BlogView from './components/blogs/BlogView';
import User from './components/users/User';
import Blog from './components/blogs/Blog';
import UserTable from './components/users/UserTable';
import Menu from './components/Menu';

import { setNotification } from './reducers/notificationReducer';
import { setBlogs, concatBlog } from './reducers/blogReducer';
import { setLoggedIn } from './reducers/userReducer';

const StyledAppContainer = styled.div`
  text-align: center;
`;

const StyledApp = styled.div`
  display: inline-block;
  text-align: left;
  width: 500px;
`;

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user.loggedInUser);
  const blogFormRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs));
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedIn(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setLoggedIn(user));
      setUsername('');
      setPassword('');
    } catch (exception) {
      notify('Wrong username or password');
    }
  };

  const createBlog = async (blogObj) => {
    const response = await blogService.create(blogObj);
    dispatch(concatBlog(response));
    notify('New blog added!');
    blogFormRef.current.toggleVisibility();
  };

  const logout = () => {
    dispatch(setLoggedIn(null));
    window.localStorage.clear();
  };

  const notify = (msg, time = 5000) => {
    dispatch(setNotification(msg));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, time);
  };

  return (
    <StyledAppContainer>
      <StyledApp>
        <Notification message={notification} />
        {user === null ? (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        ) : (
          <div>
            <h1>Blog App</h1>
            <Menu user={user} logout={logout} />
            <Routes>
              <Route
                path="/"
                element={
                  <BlogView
                    blogFormRef={blogFormRef}
                    createBlog={createBlog}
                    user={user}
                  />
                }
              />
              <Route path="/users" element={<UserTable />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog user={user} />} />
            </Routes>
          </div>
        )}
      </StyledApp>
    </StyledAppContainer>
  );
};

export default App;
