import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {
    changeSearchValue(state, action) {
      state.search = action.payload;
    },
    changeSearchFilterName(state, action) {
      state.filterName = action.payload;
    },
  },
});

export const {
  changeSearchValue, changeSearchFilterName,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
export const getSearchSelector = (state) => state.filter.search;
export const getSearchFilterSelector = (state) => state.filter.filterName;
