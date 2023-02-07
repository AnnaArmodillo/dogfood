import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    addNewProduct(state, action) {
      const currentProduct = state.find(
        (product) => product.id === action.payload,
      );
      if (currentProduct) {
        currentProduct.count += 1;
      } else {
        state.push({
          id: action.payload,
          isChecked: false,
          count: 1,
        });
      }
    },
    deleteProduct(state, action) {
      return state.filter((product) => product.id !== action.payload);
    },
    increaseProductCount(state, action) {
      const currentProduct = state.find(
        (product) => product.id === action.payload,
      );
      currentProduct.count += 1;
    },
    reduceProductCount(state, action) {
      const currentProduct = state.find(
        (product) => product.id === action.payload,
      );
      currentProduct.count -= 1;
    },
    checkProduct(state, action) {
      const currentProduct = state.find(
        (product) => product.id === action.payload,
      );
      currentProduct.isChecked = !currentProduct.isChecked;
    },
    checkAllProducts(state) {
      if (state.every((product) => product.isChecked)) {
        return state.forEach((product) => { product.isChecked = !product.isChecked; });
      }
      if (state.some((product) => product.isChecked)) {
        return state.forEach((product) => { product.isChecked = true; });
      }
      return state.forEach((product) => { product.isChecked = true; });
    },
  },
});

export const {
  addNewProduct,
  deleteProduct,
  increaseProductCount,
  reduceProductCount,
  checkProduct,
  checkAllProducts,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const getCartSelector = (state) => state.cart;
