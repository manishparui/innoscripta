import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import feedReducer from '../slice/feedSlice';
import preferencesSlice from '../slice/preferencesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    preferences: preferencesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
