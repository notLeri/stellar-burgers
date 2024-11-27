import { getIngredientsApi, TIngredientsResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgerState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};
const initialState: TBurgerState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const burgerSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
      console.log(state.ingredients);
    }
  },
  selectors: {
    ingredientsSelector: (state) => state.ingredients
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
        state.error = action.error.message ?? null;
        state.isLoading = false;
      });
  }
});

export const { setIngredients } = burgerSlice.actions;
export const reducer = burgerSlice.reducer;

export const { ingredientsSelector } = burgerSlice.selectors;

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'burgers/getIngredients',
  async () => getIngredientsApi()
);
