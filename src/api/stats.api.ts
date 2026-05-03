import apiClient from './Axios';

export const statsApi = {
    getFairnessStats: async (householdId: string): Promise<any> => {
        const response = await apiClient.get('/stats/fairness', { params: { householdId } });
        return response.data;
    },
    getPulseStats: async (householdId: string): Promise<any> => {
        const response = await apiClient.get('/stats/pulse', { params: { householdId } });
        return response.data;
    }
};
