import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './userSlice';
import axios from '../../utils/libs/axios';
import { calculateRemainingTime } from '../../utils/helper';

export let logoutTimer;

export const signupUser = createAsyncThunk(
  'user/signupuser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('/api/signup', userData);
      dispatch(manageAuthState(response.data.token));
      return response.data.token;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginuser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', userData);
      dispatch(manageAuthState(response.data.token));
      return response.data.token;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const manageAuthState = createAsyncThunk(
  'user/manageAuthState',
  (token, { dispatch }) => {
    localStorage.setItem('token', token);
    let remainingTime = calculateRemainingTime(token);
    logoutTimer = setTimeout(() => {
      dispatch(logout());
    }, remainingTime);
  }
);

export const getUserData = createAsyncThunk(
  'user/getcurrentuser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const uploadImage = createAsyncThunk(
  'user/useruploadimage',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/uploadImage', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  'user/updateuserdetails',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch(getUserData());
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);
