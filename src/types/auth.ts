export interface User {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
    phoneNumber?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    isAuth: boolean;
    user: User;
}
