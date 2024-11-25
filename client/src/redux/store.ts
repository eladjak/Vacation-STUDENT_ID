import { configureStore } from '@reduxjs/toolkit';
import vacationsReducer from './slices/vacationsSlice';
import { apiSlice } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    vacations: vacationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;






































