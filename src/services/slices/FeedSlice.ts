import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

export const fetchFeeds = createAsyncThunk(
  'feeds/all',
  async () => await getFeedsApi()
);

interface FeedsState {
  feed: TOrdersData;
  loading: boolean;
}

export const initialState: FeedsState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false
};

export const FeedSlice = createSlice({
  name: 'FeedSlice',
  initialState,
  selectors: {
    selectFeed: (state) => state.feed,
    selectFeedsLoading: (state) => state.loading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { selectFeed, selectFeedsLoading } = FeedSlice.selectors;
