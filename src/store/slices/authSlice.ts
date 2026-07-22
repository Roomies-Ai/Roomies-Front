import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth.api';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  isAuthenticated: !!storedToken && !!storedUser,
  loading: false,
  error: null,
};

const clearAuthSession = (state: AuthState) => {
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      const { user, token } = action.payload;

      // Cleanup circular refs
      const cleanUser = { ...user };
      if (cleanUser.preferredTaskTypes) {
        cleanUser.preferredTaskTypes = cleanUser.preferredTaskTypes.map((t: any) => ({
          id: t.id,
          name: t.name
        }));
      }

      state.user = cleanUser;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(cleanUser));
    },
    logout: (state) => {
      clearAuthSession(state);
    },
    setUser: (state, action: PayloadAction<any>) => {
      // Create a clean copy to avoid circular references (User -> TaskType -> User)
      const cleanUser = { ...action.payload };
      if (cleanUser.preferredTaskTypes) {
        cleanUser.preferredTaskTypes = cleanUser.preferredTaskTypes.map((t: any) => ({
          id: t.id,
          name: t.name
        }));
      }
      if (cleanUser.households) {
        cleanUser.households = cleanUser.households.map((h: any) => ({
          id: h.id,
          name: h.name
        }));
      }

      state.user = cleanUser;
      localStorage.setItem('user', JSON.stringify(cleanUser));
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      clearAuthSession(state);
    });
  }
});

export const { setLoading, setCredentials, logout, setUser, setError } = authSlice.actions;

export default authSlice.reducer;
