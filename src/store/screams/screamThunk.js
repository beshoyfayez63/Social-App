import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/libs/axios';
import { getClient, postClient, deleteClient } from '../../utils/apis';
import {
  likeScream as userLikeScream,
  unLikeScream as userUnlikeScream,
} from '../user/userSlice';
// import {} from './screamSlice';

export const fetchScreams = createAsyncThunk(
  'screams/fetchScreams',
  async () => {
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
      const response = await deleteClient(`/api/scream/${id}`, token);
      return { data: response, id };
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const createScream = createAsyncThunk(
  'scream/createscream',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      return await postClient('/api/scream', data, token);
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
