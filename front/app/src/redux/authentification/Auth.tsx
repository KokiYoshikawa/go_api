import {createSlice} from '@reduxjs/toolkit';

export type AuthInitialState = {
  adminUserId: number;
  nickName: string;
  rollId: number;
}

// Stateの初期状態
const authInitialState:AuthInitialState = {
  adminUserId: 0,
  nickName: "",
  rollId: 0,
};

// Sliceを生成し、exportする
export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuth: (state, {payload}) => {
      let auth:AuthInitialState = payload
      state.adminUserId = auth.adminUserId
      state.nickName = auth.nickName
      state.rollId = auth.rollId
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
export const { setAuth, resetAuth, defualtAuth} = authSlice.actions;