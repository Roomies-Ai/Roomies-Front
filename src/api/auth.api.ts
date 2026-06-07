import { api } from "./api";
import { type LoginRequest, type RegisterRequest, type AuthResponse } from '../types/auth';

export const authApi = api.injectEndpoints({
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
        login: builder.mutation<AuthResponse, LoginRequest>({
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
} = authApi;
