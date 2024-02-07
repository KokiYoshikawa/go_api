import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './authentification/Auth';
import { loggedInSlice } from './login/LoggedIn';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  loggedIn: loggedInSlice.reducer,
});