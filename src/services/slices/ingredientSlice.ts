import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};
const initialState: TIngredientState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    starterBunSelector: (state) =>
      state.ingredients.find((ingr) => ingr.type === 'bun'),
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

export const {} = ingredientSlice.actions;
export const { ingredientsSelector, isLoading, starterBunSelector } =
  ingredientSlice.selectors;

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);
