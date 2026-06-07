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


import { api } from "./api";

export const authApiRtk = api.injectEndpoints({
    endpoints: (builder) => ({
        googleLogin: builder.mutation<AuthResponse, { token: string }>({
            query: (body) => ({
                url: "/auth/google",
                method: "POST",
                body,
            }),
        }),
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation<AuthResponse, RegisterRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useGoogleLoginMutation,
    useRegisterMutation,
    useLoginMutation
} = authApiRtk;
