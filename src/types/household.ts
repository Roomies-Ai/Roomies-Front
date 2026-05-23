export interface Household {
    id: string;
    name: string;
    inviteCode?: string;
    members?: any[];
    tasks?: any[];
    taskTypes?: any[];
    pets?: any[];
    houseType?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateHouseholdRequest {
    name: string;
    houseType?: string;
    pets?: { name: string; kind: string }[];
}

export interface JoinHouseholdRequest {
    inviteCode: string;
}