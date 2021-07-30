import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/libs/axios';
import { getClient } from '../../utils/apis';
import {
  likeScream as userLikeScream,
  unLikeScream as userUnlikeScream,
} from '../user/userSlice';

export const fetchScreams = createAsyncThunk(
  'screams/fetchScreams',
  async () => {
    // const screams = await axios.get('/api/screams');
    // return screams.data;
    return await getClient('/api/screams');
  }
);

export const likeScream = createAsyncThunk(
  'screams/likescream',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/scream/${id}/like`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(userLikeScream(response.data.screamId));
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
    }
  }
);
export const unLikeScream = createAsyncThunk(
  'screams/unlikescream',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/scream/${id}/unlike`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(userUnlikeScream(response.data.screamId));
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const deleteScream = createAsyncThunk(
  'scream/deletescream',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/scream/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data, id };
    } catch (err) {
      console.log(err.response);
      rejectWithValue(err.response.data);
    }
  }
);

export const createScream = createAsyncThunk(
  'scream/createscream',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('/api/scream', data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
    }
  }
);
