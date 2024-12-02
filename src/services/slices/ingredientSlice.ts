import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  ingredients: TIngredient[];
  isIngrLoading: boolean;
  error: string | null;
};
const initialState: TIngredientState = {
  ingredients: [],
  isIngrLoading: false,
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
    isIngrLoading: (state) => state.isIngrLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.error = null;
        state.isIngrLoading = true;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isIngrLoading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error';
        state.isIngrLoading = false;
      });
  }
});

export const ingredientReducer = ingredientSlice.reducer;

export const { ingredientsSelector, isIngrLoading, starterBunSelector } =
  ingredientSlice.selectors;

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);
