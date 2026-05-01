import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { userApi } from '../api/user.api';
import { setCredentials, logout } from '../store/slices/authSlice';
import apiClient from '../api/Axios';

export const useAppSession = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, token } = useAppSelector((state) => state.auth);
    const [isCheckingSession, setIsCheckingSession] = useState(!!token);

    useEffect(() => {
        const initUser = async () => {
            if (!token) {
                setIsCheckingSession(false);
                return;
            }

            // Step 1: Try fetching the user with the stored access token
            try {
                const userData = await userApi.getMe();
                dispatch(setCredentials({ user: userData, token }));
                setIsCheckingSession(false);
                return;
            } catch (accessErr: any) {
                const status = accessErr?.response?.status;
                if (status !== 401 && status !== 403) {
                    // Non-auth error (network, server down) – stay logged in optimistically
                    setIsCheckingSession(false);
                    return;
                }
            }

            // Step 2: Access token expired – try the refresh token (httpOnly cookie)
            try {
                const refreshRes = await apiClient.post('/auth/refresh');
                const { accessToken, user: refreshedUser } = refreshRes.data;
                dispatch(setCredentials({ user: refreshedUser, token: accessToken }));
            } catch {
                // Refresh token also expired – force logout
                dispatch(logout());
            } finally {
                setIsCheckingSession(false);
            }
        };

        initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isAuthenticated, isCheckingSession };
};
