import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (posts) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', posts);
  return response.data;
});

export const editExistingPost = createAsyncThunk('posts/editExistingPost', async ({ id, title, body }) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { title, body });
  return response.data;
});


export const deleteExistingPost = createAsyncThunk('posts/deleteExistingPost', async (postId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return postId;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editExistingPost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const existingPostIndex = state.list.findIndex(post => post.id === updatedPost.id);
        if (existingPostIndex !== -1) {
          state.list[existingPostIndex] = updatedPost;
        }
      })
      .addCase(deleteExistingPost.fulfilled, (state, action) => {
        state.list = state.list.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
