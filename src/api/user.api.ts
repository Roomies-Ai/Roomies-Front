import apiClient from './Axios';

export const userApi = {
    getMe: async () => {
        const response = await apiClient.get('/users/me');
        return response.data;
    },
    updateMe: async (data: any) => {
        const response = await apiClient.patch('/users/me', data);
        return response.data;
    },
    changePassword: async (passwords: any) => {
        const response = await apiClient.patch('/users/me/password', passwords);
        return response.data;
    },
    updatePreferredTasks: async (taskTypeIds: string[]) => {
        const response = await apiClient.patch('/users/me/preferred-tasks', { taskTypeIds });
        return response.data;
    },
    getAvailableTaskTypes: async () => {
        const response = await apiClient.get('/users/me/available-tasks');
        return response.data;
    },
    getTelegramToken: async (): Promise<{ telegramToken: string }> => {
        const response = await apiClient.get('/users/me/telegram-token');
        return response.data;
    },
    unlinkTelegram: async (): Promise<void> => {
        await apiClient.delete('/users/me/telegram');
    },
};
