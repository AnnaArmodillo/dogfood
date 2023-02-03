import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const userIDSlice = createSlice({
  name: 'userID',
  initialState: initState.userID,
  reducers: {
    setUserID(state, action) {
      return action.payload;
    },
    clearUserID() {
      return '';
    },
  },
});

export const { setUserID, clearUserID } = userIDSlice.actions;
export const userIDReducer = userIDSlice.reducer;
export const getUserIDSelector = (state) => state.userID;
