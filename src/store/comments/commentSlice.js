import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/libs/axios';
import { addComment } from '../screams/screamSlice';

export const createComment = createAsyncThunk(
  'comment/createcomment',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/scream/${id}/comment`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addComment(response.data));
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const comments = createSlice({
  name: 'comment',
  initialState: {},
  reducers: {},
});
export default comments.reducer;
