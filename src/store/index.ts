import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import challengeReducer from './slices/challengeSlice';
import carbonReducer from './slices/carbonSlice';
import communityReducer from './slices/communitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challenges: challengeReducer,
    carbon: carbonReducer,
    community: communityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
