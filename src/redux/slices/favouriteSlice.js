import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: initState.favourite,
  reducers: {
    addToFavourite(state, action) {
      state.push(action.payload);
    },
    deleteFromFavourite(state, action) {
      return state.filter((product) => product !== action.payload);
    },
  },
});

export const {
  addToFavourite,
  deleteFromFavourite,
} = favouriteSlice.actions;
export const favouriteReducer = favouriteSlice.reducer;
export const getFavouriteSelector = (state) => state.favourite;
