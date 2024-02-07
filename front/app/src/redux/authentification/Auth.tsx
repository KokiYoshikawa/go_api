import {createSlice} from '@reduxjs/toolkit';

export type AuthInitialState = {
  adminUserId: number;
  firstName: string;
  lastName: string;
  rollId: number;
}

// Stateの初期状態
const authInitialState:AuthInitialState = {
  adminUserId: 0,
  firstName: "",
  lastName: "",
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
      state.firstName = auth.firstName
      state.lastName = auth.lastName
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