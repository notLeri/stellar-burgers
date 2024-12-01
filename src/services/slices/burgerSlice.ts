import { getIngredientsApi, TIngredientsResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};
const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error';
        state.isLoading = false;
      });
  }
});

export const ingredientReducer = ingredientSlice.reducer;

export const {  } = ingredientSlice.actions;
export const { ingredientsSelector, isLoading } = ingredientSlice.selectors;

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'burgers/getIngredients',
  async () => getIngredientsApi()
);
