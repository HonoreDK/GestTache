import { configureStore } from '@reduxjs/toolkit';
import tachesReducer from './tachesSlice';

export const store = configureStore({
  reducer: {
    taches: tachesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;