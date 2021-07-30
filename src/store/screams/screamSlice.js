import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {
  fetchScreams,
  createScream,
  likeScream,
  unLikeScream,
  deleteScream,
} from './screamThunk';

const screamAdapter = createEntityAdapter({
  selectId: (scream) => scream.screamId,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = screamAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const screamSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchScreams.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchScreams.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      screamAdapter.upsertMany(state, action.payload);
    },
    [fetchScreams.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createScream.fulfilled]: (state, action) => {
      screamAdapter.addOne(state, action.payload);
    },

    [likeScream.fulfilled]: (state, action) => {
      state.entities[action.payload.screamId].likeCount =
        action.payload.likeCount;
    },
    [unLikeScream.fulfilled]: (state, action) => {
      state.entities[action.payload.screamId].likeCount =
        action.payload.likeCount;
    },
    [deleteScream.fulfilled]: (state, action) => {
      console.log(action.payload);
      screamAdapter.removeOne(state, action.payload.id);
    },
  },
});

export default screamSlice.reducer;

export const {
  selectAll: selectAllScreams,
  selectIds: selectScreamByIds,
  selectById: selectScreamById,
} = screamAdapter.getSelectors((state) => state.screams);

// export const memomizeScreams = createSelector(
//   [selectAllScreams],
//   (screams) => screams
// );
