import { getUserApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TUserState = {
  user: TUser;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: {
    name: '',
    email: ''
  },
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    userSelector: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      });
  }
});

export const userReducer = userSlice.reducer;

export const {} = userSlice.actions;
export const { userSelector } = userSlice.selectors;

export const getUser = createAsyncThunk<{ user: TUser }>(
  'users/getUser',
  async () => getUserApi()
);
