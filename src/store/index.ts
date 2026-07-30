import { configureStore } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import authReducer, { logout } from './slices/authSlice';
import notificationsReducer from './slices/notificationsSlice';
import { api } from '../api/api';
import { authApi } from '../api/auth.api';

// RTK Query caches responses regardless of which user fetched them. Without this,
// a household/task/etc. fetched by user A stays in the cache and is served straight
// to user B after A logs out and B logs in on the same session, before any fresh
// network request happens.
const resetApiCacheOnLogout: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  if (logout.match(action) || authApi.endpoints.logout.matchFulfilled(action)) {
    storeApi.dispatch(api.util.resetApiState());
  }
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware, resetApiCacheOnLogout),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
