import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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
});

export const { setLoading, setCredentials, logout, setUser, setError } = authSlice.actions;

export default authSlice.reducer;
