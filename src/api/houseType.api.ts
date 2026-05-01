import apiClient from './Axios';

export interface HouseType {
    id: string;
    name: string;
}

export const houseTypeApi = {
    getAll: async (): Promise<HouseType[]> => {
        const response = await apiClient.get<HouseType[]>('/house-types');
        return response.data;
    }
};
