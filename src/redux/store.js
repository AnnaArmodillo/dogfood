import { configureStore } from '@reduxjs/toolkit';
import { getInitState } from './initState';
import { cartReducer } from './slices/cartSlice';
import { favouriteReducer } from './slices/favouriteSlice';
import { filterReducer } from './slices/filterSlice';
import { tokenReducer } from './slices/tokenSlice';
import { userIDReducer } from './slices/userIDSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    userID: userIDReducer,
    cart: cartReducer,
    filter: filterReducer,
    favourite: favouriteReducer,
  },
  preloadedState: getInitState(),
});

store.subscribe(() => {
  localStorage.setItem('REDUX_LS_KEY', JSON.stringify(store.getState()));
});
