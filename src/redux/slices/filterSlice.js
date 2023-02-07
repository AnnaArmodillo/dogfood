import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    changeSearchFilter(state, action) {
      state.search = action.payload;
    },
  },
});

export const {
  changeSearchFilter,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
export const getSearchSelector = (state) => state.filter.search;
