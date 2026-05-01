import apiClient from './Axios';
import { type LoginRequest, type RegisterRequest, type AuthResponse } from '../types/auth';

export const authApi = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        return response.data;
    },
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        return response.data;
    },
    googleLogin: async (token: string): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/google', { token });
        return response.data;
    },
};
