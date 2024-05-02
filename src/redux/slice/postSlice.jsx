import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk("post/getPost", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
});
export const savePost = createAsyncThunk("post/addPost", async ({ title, body }) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/posts", { title, body });
  return response.data;
});

export const updatePost = createAsyncThunk("post/updatePost", async (post) => {
  const { id, title, body } = post;
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { title, body });
  return response.data;
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

const postEntity = createEntityAdapter({
  selectId: (post) => post.id,
});

const postSlice = createSlice({
  name: "post",
  initialState: postEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getPost.fulfilled, (state, action) => {
      postEntity.setAll(state, action.payload);
    });
    builder.addCase(savePost.fulfilled, (state, action) => {
      postEntity.addOne(state, action.payload);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      postEntity.updateOne(state, { id: action.payload.id, changes: action.payload });
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      postEntity.removeOne(state, action.payload);
    });
  },
});

export const postSelectors = postEntity.getSelectors((state) => state.post);
export default postSlice.reducer;
