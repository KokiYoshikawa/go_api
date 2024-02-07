import {createSlice} from '@reduxjs/toolkit';

export type LoggedInInitialState = {
  isLogin: boolean;
}

// Stateの初期状態
const loggedInInitialState:LoggedInInitialState = {
  isLogin: false,
};

// Sliceを生成し、exportする
export const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState: loggedInInitialState,
  reducers: {
    setLoginState: (state, {payload}) => {
      state.isLogin = payload
    },
    resetLoginState: state => {
      state = loggedInInitialState;
    },
    defaultLoginDtate: state => {
      return state
    }
  },
});

// Action Creatorsをエクスポート
export const {setLoginState, resetLoginState, defaultLoginDtate} = loggedInSlice.actions;