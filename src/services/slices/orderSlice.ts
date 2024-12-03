import { orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrderModalData } from '@utils-types';

type TOrderState = {
  orderModalData: TOrderModalData | null;
  orderRequest: boolean;
  isFeedsLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderModalData: null,
  orderRequest: false,
  isFeedsLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    isFeedsLoading: (state) => state.isFeedsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderModalData = action.payload;
          state.orderRequest = false;
        }
      )
      .addCase(orderBurger.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.orderRequest = false;
      });
  }
});

export const orderReducer = orderSlice.reducer;

export const { orderRequestSelector, orderModalDataSelector, isFeedsLoading } =
  orderSlice.selectors;

export const orderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/orderBurger',
  async (order) => await orderBurgerApi(order)
);
