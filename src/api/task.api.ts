import apiClient from './Axios';
import type { SuggestedTask } from '../types/task';

export const taskApi = {
    generateSuggestions: async (household: any): Promise<SuggestedTask[]> => {
        const response = await apiClient.post<SuggestedTask[]>('/tasks/ai-parse', { household });
        return response.data;
    },
    bulkCreate: async (householdId: string, tasks: SuggestedTask[]): Promise<any> => {
        const response = await apiClient.post('/tasks/telegram/approve', { 
            householdId, 
            tasks 
        });
        return response.data;
    },
    updateTask: async (id: string, data: any): Promise<any> => {
        const response = await apiClient.patch(`/tasks/${id}`, data);
        return response.data;
    },
    getFairnessSuggestions: async (taskId: string): Promise<any[]> => {
        const response = await apiClient.get(`/tasks/${taskId}/fairness-suggestions`);
        return response.data;
    }
};
