import { getFeedsApi, orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { TOrdersData } from '@utils-types';

type TOrderState = {
  orderModalData: TOrder | null;
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
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    isFeedsLoading: (state) => state.isFeedsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(
        placeOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = action.payload.success;
          state.orderModalData = action.payload.order;
        }
      )
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.orderRequest = false;
      });
  }
});

export const orderReducer = orderSlice.reducer;

export const { orderRequestSelector, orderModalDataSelector, isFeedsLoading } =
  orderSlice.selectors;

export const placeOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'orders/placeOrder',
  async (order) => await orderBurgerApi(order)
);
