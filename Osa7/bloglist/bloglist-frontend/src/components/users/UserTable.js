import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserRow from './UserRow';
import userService from '../../services/user';
import { setUsers } from '../../reducers/userReducer';

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    userService.getUsers().then((res) => {
      dispatch(setUsers(res));
    });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
