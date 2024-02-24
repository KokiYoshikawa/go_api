import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './authentification/Auth';
import { userAuthSlice } from './authentification/UserAuth';
import { loggedInSlice } from './login/LoggedIn';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  userAuth: userAuthSlice.reducer,
  loggedIn: loggedInSlice.reducer,
});