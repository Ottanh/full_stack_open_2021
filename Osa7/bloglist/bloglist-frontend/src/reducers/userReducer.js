import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null,
    loggedInUserBlogs: [],
    users: [],
  },
  reducers: {
    setLoggedIn(state, action) {
      state.loggedInUser = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { setLoggedIn, setUsers } = userSlice.actions;
export default userSlice.reducer;
