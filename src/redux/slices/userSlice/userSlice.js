import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../../initState';
import { rootUserReducer } from './rootUserReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: rootUserReducer,
});

export const userReducer = userSlice.reducer;
export const getUserSelector = (state) => state.user;
