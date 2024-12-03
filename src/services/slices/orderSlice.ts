import {
  getOrderByNumberApi,
  orderBurgerApi,
  TNewOrderResponse,
  TOrderResponse
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrderModalData } from '@utils-types';

type TOrderState = {
  orderInfo: TOrder | null;
  orderModalData: TOrderModalData | null;
  orderRequest: boolean;
  isFeedsLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderInfo: null,
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
    isFeedsLoading: (state) => state.isFeedsLoading,
    orderInfoSelector: (state) => state.orderInfo
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
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = null;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.orderInfo = action.payload.orders[0];
        }
      )
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      });
  }
});

export const orderReducer = orderSlice.reducer;

export const {
  orderRequestSelector,
  orderModalDataSelector,
  isFeedsLoading,
  orderInfoSelector
} = orderSlice.selectors;

export const orderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/orderBurger',
  async (order) => await orderBurgerApi(order)
);

export const getOrderByNumber = createAsyncThunk<TOrderResponse, number>(
  'order/getOrderByNumber',
  async (number) => await getOrderByNumberApi(number)
);
