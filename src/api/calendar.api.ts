import apiClient from './Axios';

export const calendarApi = {
    getStatus: async (): Promise<{ connected: boolean; calendarSyncEnabled: boolean }> => {
        const response = await apiClient.get('/google-calendar/status');
        return response.data;
    },

    getConnectUrl: async (): Promise<{ url: string }> => {
        const response = await apiClient.get('/google-calendar/connect');
        return response.data;
    },

    toggleSync: async (): Promise<{ calendarSyncEnabled: boolean }> => {
        const response = await apiClient.patch('/google-calendar/toggle');
        return response.data;
    },

    disconnect: async (): Promise<void> => {
        await apiClient.delete('/google-calendar/disconnect');
    },
};
