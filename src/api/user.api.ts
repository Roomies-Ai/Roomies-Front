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
    uploadProfilePicture: async (file: Blob) => {
        const formData = new FormData();
        formData.append('file', file, 'profile-picture.jpg');
        // Clear the client's default JSON header so the browser can set the
        // multipart Content-Type itself, including the boundary.
        const response = await apiClient.post('/users/me/picture', formData, {
            headers: { 'Content-Type': undefined },
        });
        return response.data;
    },
    deleteProfilePicture: async () => {
        const response = await apiClient.delete('/users/me/picture');
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
