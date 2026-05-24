import apiClient from './Axios';

export const notificationsApi = {
    getMyNotifications: async (): Promise<any[]> => {
        const response = await apiClient.get('/notifications/my');
        return response.data;
    },
};
