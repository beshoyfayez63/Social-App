import { configureStore } from '@reduxjs/toolkit';

import screamReducer from './screams/screamSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    screams: screamReducer,
    user: userReducer,
  },
});

export default store;
