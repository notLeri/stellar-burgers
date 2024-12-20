import { configureStore } from '@reduxjs/toolkit';
import {
  burgerConstructorReducer,
  ingredientReducer,
  userOrdersReducer,
  feedsReducer,
  orderReducer,
  userReducer
} from '@slices';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    ingredients: ingredientReducer,
    userOrders: userOrdersReducer,
    feeds: feedsReducer,
    order: orderReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
