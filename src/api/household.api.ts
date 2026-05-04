import apiClient from './Axios';
import type { Household, CreateHouseholdRequest, JoinHouseholdRequest } from '../types/household';

export const householdApi = {
    getMyHouseholds: async (): Promise<Household[]> => {
        const response = await apiClient.get<Household[]>('/households/me');
        return response.data;
    },
    getHouseholdById: async (id: string): Promise<Household> => {
        const response = await apiClient.get<Household>(`/households/${id}`);
        return response.data;
    },
    createHousehold: async (data: CreateHouseholdRequest): Promise<Household> => {
        const response = await apiClient.post<Household>('/households', data);
        return response.data;
    },
    joinHousehold: async (data: JoinHouseholdRequest): Promise<Household> => {
        const response = await apiClient.post<Household>('/households/join', data);
        return response.data;
    },
    generateInviteCode: async (id: string): Promise<{ inviteCode: string }> => {
        const response = await apiClient.post<{ inviteCode: string }>(`/households/${id}/invites`);
        return response.data;
    },
    addPet: async (id: string, data: { name: string; kind: string }): Promise<any> => {
        const response = await apiClient.post(`/households/${id}/pets`, data);
        return response.data;
    },
    addTaskType: async (id: string, name: string): Promise<any> => {
        const response = await apiClient.post(`/households/${id}/task-types`, { name });
        return response.data;
    },
    leaveHousehold: async (householdId: string, userId: string): Promise<void> => {
        await apiClient.delete(`/households/${householdId}/users/${userId}`);
    }
};