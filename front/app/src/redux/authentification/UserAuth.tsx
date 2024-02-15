import {createSlice} from '@reduxjs/toolkit';

export type AuthInitialState = {
  userId: number;
  nickName: string;
}

// Stateの初期状態
const authInitialState:AuthInitialState = {
  userId: 0,
  nickName: "",
};

// Sliceを生成し、exportする
export const userAuthSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuth: (state, {payload}) => {
      let auth:AuthInitialState = payload
      state.userId = auth.userId
      state.nickName = auth.nickName
    },
    resetAuth: state => {
      state = authInitialState;
    },
    defualtAuth: state => {
      return state
    }
  },
});

// Action Creatorsをエクスポート
export const { setAuth, resetAuth, defualtAuth} = userAuthSlice.actions;