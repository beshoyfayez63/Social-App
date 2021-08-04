import { configureStore } from '@reduxjs/toolkit';

import screamReducer from './screams/screamSlice';
import userReducer from './user/userSlice';
import commentReducer from './comments/commentSlice';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    screams: screamReducer,
    user: userReducer,
    comment: commentReducer,
  },
});

export default store;
