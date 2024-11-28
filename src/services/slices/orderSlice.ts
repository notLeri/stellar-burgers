import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData, TUser } from '@utils-types';

type TOrderState = {
    restorauntOrders: {
        orders: TOrder[];
        total: number;
        totalToday: number;
    };
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
  name: 'order',
  initialState,
  reducers: {
    orderPrice: (state, action: PayloadAction<{ ingredients: string[] }>) => {

    }
  },
  selectors: {
    // orderSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.restorauntOrders = action.payload;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      });
  }
});

export const userReducer = orderSlice.reducer;

export const {} = orderSlice.actions;
export const {  } = orderSlice.selectors;

export const getUser = createAsyncThunk<TOrdersData>(
  'users/getUser',
  async () => getFeedsApi()
);
