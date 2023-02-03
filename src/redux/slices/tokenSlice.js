import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const tokenSlice = createSlice({
  name: 'token',
  initialState: initState.token,
  reducers: {
    setToken(state, action) {
      return action.payload;
    },
    clearToken() {
      return '';
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
export const getTokenSelector = (state) => state.token;
