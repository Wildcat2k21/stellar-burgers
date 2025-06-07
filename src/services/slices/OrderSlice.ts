import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchOrderByNumber = createAsyncThunk(
  'order/one',
  async (number: number) => (await getOrderByNumberApi(number)).orders[0]
);

interface OrderState {
  order: TOrder | null;
  loading: boolean;
}

export const initialState: OrderState = {
  order: null,
  loading: false
};

export const OrderSlice = createSlice({
  name: 'OrderSlice',
  initialState,
  selectors: {
    selectOrder: (state) => state.order,
    selectOrderLoading: (state) => state.loading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { selectOrder, selectOrderLoading } = OrderSlice.selectors;
