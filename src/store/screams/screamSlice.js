import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { getClient } from '../../utils/apis';
import {
  fetchScreams,
  createScream,
  // getScream,
  likeScream,
  unLikeScream,
  deleteScream,
} from './screamThunk';

export const getScream = createAsyncThunk(
  'scream/getScream',
  async (id, { rejectWithValue }) => {
    try {
      return await getClient(`/api/scream/${id}`);
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);
// /////////////////////////////////////////////////

const screamAdapter = createEntityAdapter({
  selectId: (scream) => scream.screamId,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const screams = screamAdapter.getInitialState({});

export const screamSlice = createSlice({
  name: 'screams',
  initialState: {
    status: 'idle',
    screams,
    scream: null,
    error: null,
  },
  reducers: {
    addComment(state, action) {
      state.scream.comments.unshift(action.payload);
    },
    getUserScreams(state, action) {
      screamAdapter.setAll(state.screams, action.payload);
    },
  },
  extraReducers: {
    [fetchScreams.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchScreams.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      screamAdapter.setAll(state.screams, action.payload);
    },
    [fetchScreams.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [getScream.fulfilled]: (state, action) => {
      if (state.scream !== null) {
        state.scream = null;
        state.scream = action.payload;
      } else {
        state.scream = action.payload;
      }
    },
    [createScream.fulfilled]: (state, action) => {
      screamAdapter.addOne(state.screams, action.payload);
    },
    [likeScream.fulfilled]: (state, action) => {
      state.screams.entities[action.payload.screamId].likeCount =
        action.payload.likeCount;
    },
    [unLikeScream.fulfilled]: (state, action) => {
      state.screams.entities[action.payload.screamId].likeCount =
        action.payload.likeCount;
    },
    [deleteScream.fulfilled]: (state, action) => {
      screamAdapter.removeOne(state.screams, action.payload.id);
    },
  },
});

export default screamSlice.reducer;
export const { addComment, getUserScreams } = screamSlice.actions;

export const {
  selectAll: selectAllScreams,
  selectIds: selectScreamByIds,
  selectById: selectScreamById,
} = screamAdapter.getSelectors((state) => state.screams.screams);

export const memomizeScreamById = createSelector(
  [selectScreamById],
  (scream) => scream
);

export const memomizeScream = createSelector(
  [(state) => state.screams.scream],
  (scream) => scream
);
