import { configureStore } from '@reduxjs/toolkit';
import { getInitState } from './initState';
import { tokenReducer } from './slices/tokenSlice';
import { userIDReducer } from './slices/userIDSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    userID: userIDReducer,
  },
  preloadedState: getInitState(),
});

store.subscribe(() => {
  localStorage.setItem('REDUX_LS_KEY', JSON.stringify(store.getState()));
});
