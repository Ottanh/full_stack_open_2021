import { createSlice } from '@reduxjs/toolkit';

const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort(byLikes);
    },
    concatBlog(state, action) {
      return state.concat(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
    putBlog(state, action) {
      const updatedBlog = action.payload;
      const index = state.findIndex((b) => b.id === updatedBlog.id);
      state[index] = updatedBlog;
      return state.sort(byLikes);
    },
  },
});

export const { setBlogs, concatBlog, removeBlog, putBlog } = blogSlice.actions;
export default blogSlice.reducer;
