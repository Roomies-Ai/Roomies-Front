export interface ProfileUser {
    id: string;
    username: string;
    email: string;
    phoneNumber?: string;
    profilePicture?: string;
    role?: string;
    createdAt?: string;
    vibes: string[];
    preferences: {
        loudMusic: boolean;
        [key: string]: any;
    };
    preferredTaskTypes?: {
        id: string;
        name: string;
    }[];
}

export interface ProfileFormState {
    username: string;
    email: string;
    phoneNumber: string;
    vibes: string[];
    preferences: {
        loudMusic: boolean;
        [key: string]: any;
    };
}
