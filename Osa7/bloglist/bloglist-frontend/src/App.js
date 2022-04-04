import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/forms/Blogform';
import LoginForm from './components/forms/Loginform';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import BlogList from './components/blogs/BlogList';

import { setNotification } from './reducers/notificationReducer';
import { setBlogs, concatBlog } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs));
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
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
      dispatch(setUser(user));
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
    dispatch(setUser(null));
    window.localStorage.clear();
  };

  const notify = (msg, time = 5000) => {
    dispatch(setNotification(msg));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, time);
  };

  return (
    <div>
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
          <p>
            {user.name} logged in
            <button onClick={logout}>Logout</button>
          </p>

          <Togglable buttonLabel="Create blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          <BlogList user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
