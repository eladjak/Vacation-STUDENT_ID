import { configureStore } from '@reduxjs/toolkit';
import vacationReducer from './slices/vacationSlice';

export const store = configureStore({
  reducer: {
    vacations: vacationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
