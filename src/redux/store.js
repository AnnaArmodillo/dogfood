import { configureStore } from '@reduxjs/toolkit';
import { getInitState } from './initState';
import { cartReducer } from './slices/cartSlice';
import { favouriteReducer } from './slices/favouriteSlice';
import { filterReducer } from './slices/filterSlice';
import { rootUserReducer } from './slices/userSlice/rootUserReducer';

export const store = configureStore({
  reducer: {
    user: rootUserReducer,
    cart: cartReducer,
    filter: filterReducer,
    favourite: favouriteReducer,
  },
  preloadedState: getInitState(),
});

store.subscribe(() => {
  localStorage.setItem('REDUX_LS_KEY', JSON.stringify(store.getState()));
});
