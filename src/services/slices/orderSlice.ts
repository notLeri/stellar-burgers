import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { TOrdersData } from '@utils-types';

type TOrderState = {
  restorauntOrders: TOrdersData;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  restorauntOrders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.restorauntOrders.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.restorauntOrders = action.payload;
        }
      )
      .addCase(getFeeds.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      });
  }
});

export const orderReducer = orderSlice.reducer;

export const { ordersSelector } = orderSlice.selectors;

export const getFeeds = createAsyncThunk<TOrdersData>(
  'orders/getFeeds',
  async () => getFeedsApi()
);
