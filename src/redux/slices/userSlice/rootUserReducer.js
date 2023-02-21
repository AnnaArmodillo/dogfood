import { combineReducers } from '@reduxjs/toolkit';
import { emailReducer } from './emailSlice';
import { tokenReducer } from './tokenSlice';
import { userIDReducer } from './userIDSlice';

export const rootUserReducer = combineReducers({
  token: tokenReducer,
  userID: userIDReducer,
  email: emailReducer,
});
