import { configureStore } from '@reduxjs/toolkit';
// import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { rootReducer } from './Reducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk]
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;