import { configureStore } from '@reduxjs/toolkit';
import {
  burgerConstructorReducer,
  feedsReducer,
  ingredientReducer,
  orderReducer
} from '@slices';
import { userReducer } from '@slices';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: {
    user: userReducer,
    feeds: feedsReducer,
    order: orderReducer,
    ingredients: ingredientReducer,
    burgerConstructor: burgerConstructorReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
