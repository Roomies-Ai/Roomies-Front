export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Roomie {
    id: string;
    name: string;
    role: 'admin' | 'member';
}
