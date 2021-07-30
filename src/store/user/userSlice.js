import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { signupUser, loginUser, getUserData, logoutTimer } from './userThunk';

const likesAdapter = createEntityAdapter({
  selectId: (like) => like.screamId,
});
const notificationsAdapter = createEntityAdapter({
  selectId: (notification) => notification.notificationId,
});

// const userAdapter = createEntityAdapter({});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle',
    error: null,
    credentials: {},
    likes: likesAdapter.getInitialState({}),
    notifications: notificationsAdapter.getInitialState({}),
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.token = null;
      state.credentials = {};
      likesAdapter.removeAll(state.likes);
      notificationsAdapter.removeAll(state.notifications);
      if (logoutTimer) clearTimeout(logoutTimer);
    },
    likeScream(state, action) {
      likesAdapter.addOne(state.likes, {
        screamId: action.payload,
        userHandler: state.credentials.handle,
      });
    },
    unLikeScream(state, action) {
      likesAdapter.removeOne(state.likes, action.payload);
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      console.log(action.payload);
      state.status = 'failed';
      state.error = action.payload.general;
    },
    [signupUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.token = action.payload;
    },
    [signupUser.rejected]: (state, action) => {
      console.log(action.payload);
      state.status = 'failed';
      if (action.payload.email) {
        console.log('EMail');
        state.error = action.payload.email;
      } else if (action.payload.handle) {
        console.log('handle');
        state.error = action.payload.handle;
      } else if (action.payload.general) {
        state.error = action.payload.general;
      } else {
        state.error = 'Something went wrong, please try again later';
      }
    },
    [getUserData.pending]: (state, action) => {
      state.status = 'pending';
    },
    [getUserData.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.status = 'success';
      state.credentials = action.payload.credentials;
      notificationsAdapter.upsertMany(
        state.notifications,
        action.payload.notifications
      );
      likesAdapter.upsertMany(state.likes, action.payload.likes);
    },
    [getUserData.rejected]: (state, action) => {
      state.status = 'rejected';
    },
  },
});

export default userSlice.reducer;
export const { logout, likeScream, unLikeScream } = userSlice.actions;

export const errorMessage = (state) => state.user.error;
export const token = (state) => state.user.token;
export const {
  selectAll: selectAllLikes,
  selectIds: selectlikesIds,
  selectById: selectLikeId,
  selectEntities: selectLikeEntities,
} = likesAdapter.getSelectors((state) => state.user.likes);

export const memomizeEntities = createSelector(
  [selectLikeEntities, (state, screamId) => screamId],
  (likes, screamId) => likes[screamId]
);
