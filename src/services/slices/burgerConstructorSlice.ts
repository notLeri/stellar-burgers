import { BurgerConstructor } from '@components';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};
const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngr: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push({
        id: Math.random().toString(36),
        ...action.payload
      });
    },
    deleteIngr: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = {
        id: Math.random().toString(36),
        ...action.payload
      };
    },
    moveUpIngr: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item._id === action.payload
      );
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index - 1];
      state.ingredients[index - 1] = temp;
    },
    moveDownIngr: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item._id === action.payload
      );
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = temp;
    }
  },
  selectors: {
    burgerConstructorSelector: (state: TBurgerConstructorState) => state,
    bunSelector: (state) => state.bun,
    constructorIngredientsSelector: (state) => state.ingredients
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const { addIngr, deleteIngr, setBun, moveUpIngr, moveDownIngr } =
  burgerConstructorSlice.actions;
export const {
  bunSelector,
  constructorIngredientsSelector,
  burgerConstructorSelector
} = burgerConstructorSlice.selectors;
