import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../../initState';

const emailSlice = createSlice({
  name: 'email',
  initialState: initState.user.email,
  reducers: {
    setEmail(state, action) {
      return action.payload;
    },
    clearEmail() {
      return '';
    },
  },
});

export const { setEmail, clearEmail } = emailSlice.actions;
export const emailReducer = emailSlice.reducer;
export const getemailSelector = (state) => state.user.email;
