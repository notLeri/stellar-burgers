import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
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
    addIngr: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredientsObject: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...ingredientsObject } };
      }
    },
    deleteIngr: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item._id === action.payload
      );
      state.ingredients.splice(index, 1);
    },
    moveUpIngr: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index - 1];
      state.ingredients[index - 1] = temp;
    },
    moveDownIngr: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = temp;
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    burgerConstructorSelector: (state: TBurgerConstructorState) => state,
    bunSelector: (state) => state.bun,
    constructorIngredientsSelector: (state) => state.ingredients,
    ingrArrSelector: (state) => {
      if (!state.bun) return [];
      const arr: string[] = [];
      state.ingredients.forEach((ingr) => {
        arr.push(ingr._id);
      });
      return [...arr, state.bun?._id, state.bun?._id];
    }
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const {
  addIngr,
  deleteIngr,
  moveUpIngr,
  moveDownIngr,
  resetConstructor
} = burgerConstructorSlice.actions;
export const {
  bunSelector,
  constructorIngredientsSelector,
  burgerConstructorSelector,
  ingrArrSelector
} = burgerConstructorSlice.selectors;
