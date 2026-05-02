import apiClient from './Axios';

export const userApi = {
    getMe: async () => {
        const response = await apiClient.get('/users/me');
        return response.data;
    },
    updateMe: async (data: any) => {
        const response = await apiClient.patch('/users/me', data);
        return response.data;
    }
};
