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
    //     increaseProductCount(state, action) {
    //       const currentProduct = state.find(
    //         (product) => product.id === action.payload,
    //       );
    //       currentProduct.count += 1;
    //     },
    //     reduceProductCount(state, action) {
    //       const currentProduct = state.find(
    //         (product) => product.id === action.payload,
    //       );
    //       currentProduct.count -= 1;
    //     },
    //     checkProduct(state, action) {
    //       const currentProduct = state.find(
    //         (product) => product.id === action.payload,
    //       );
    //       currentProduct.isChecked = !currentProduct.isChecked;
    //     },
    //     checkAllProducts(state) {
    //       if (state.every((product) => product.isChecked)) {
    //         return state.forEach((product) => { product.isChecked = !product.isChecked; });
    //       }
    //       if (state.some((product) => product.isChecked)) {
    //         return state.forEach((product) => { product.isChecked = true; });
    //       }
    //       return state.forEach((product) => { product.isChecked = true; });
    //     },
  },
});

export const {
  addToFavourite,
  deleteFromFavourite,
//   increaseProductCount,
//   reduceProductCount,
//   checkProduct,
//   checkAllProducts,
} = favouriteSlice.actions;
export const favouriteReducer = favouriteSlice.reducer;
export const getFavouriteSelector = (state) => state.favourite;
