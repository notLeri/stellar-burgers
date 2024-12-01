import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { TOrdersData } from '@utils-types';

type TOrderState = {
  restorauntOrders: TOrdersData;
  burgerConstructor: {
    bun: TConstructorIngredient;
    ingredients: TConstructorIngredient[];
  };
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  restorauntOrders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  burgerConstructor: {
    bun: {
      id: '',
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    ingredients: []
  },
  orderModalData: null,
  orderRequest: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addIngr: (state, action: PayloadAction<TIngredient>) => {
      state.burgerConstructor.ingredients.push({
        id: Math.random().toString(36),
        ...action.payload
      });
    },
    deleteIngr: (state, action: PayloadAction<string>) => {
      state.burgerConstructor.ingredients =
        state.burgerConstructor.ingredients.filter(
          (item) => item._id !== action.payload
        );
    },
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.burgerConstructor.bun = {
        id: Math.random().toString(36),
        ...action.payload
      };
    },
    moveUpIngr: (state, action: PayloadAction<string>) => {
      const index = state.burgerConstructor.ingredients.findIndex(
        (item) => item._id === action.payload
      );
      const temp = state.burgerConstructor.ingredients[index];
      state.burgerConstructor.ingredients[index] =
        state.burgerConstructor.ingredients[index - 1];
      state.burgerConstructor.ingredients[index - 1] = temp;
    },
    moveDownIngr: (state, action: PayloadAction<string>) => {
      const index = state.burgerConstructor.ingredients.findIndex(
        (item) => item._id === action.payload
      );
      const temp = state.burgerConstructor.ingredients[index];
      state.burgerConstructor.ingredients[index] =
        state.burgerConstructor.ingredients[index + 1];
      state.burgerConstructor.ingredients[index + 1] = temp;
    }
  },
  selectors: {
    ordersSelector: (state) => state.restorauntOrders.orders,
    restorauntOrdersSelector: (state) => state.restorauntOrders,
    burgerConstructorSelector: (state) => state.burgerConstructor,
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.orderRequest = false;
          state.restorauntOrders = action.payload;
        }
      )
      .addCase(getFeeds.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.orderRequest = false;
      });
  }
});

export const orderReducer = orderSlice.reducer;

export const { addIngr, deleteIngr, setBun, moveUpIngr, moveDownIngr } =
  orderSlice.actions;
export const {
  ordersSelector,
  restorauntOrdersSelector,
  burgerConstructorSelector,
  orderRequestSelector,
  orderModalDataSelector
} = orderSlice.selectors;

export const getFeeds = createAsyncThunk<TOrdersData>(
  'orders/getFeeds',
  async () => getFeedsApi()
);
