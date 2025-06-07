import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import type { TOrder } from '@utils-types';

interface ProfileOrdersState {
  orders: TOrder[];
  loading: boolean;
}

export const initialState: ProfileOrdersState = {
  orders: [],
  loading: false
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async () => await getOrdersApi()
);

export const ProfileOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersLoading: (state) => state.loading
  }
});

export const { selectOrders, selectOrdersLoading } =
  ProfileOrdersSlice.selectors;

export default ProfileOrdersSlice;
