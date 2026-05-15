export interface Household {
    id: string;
    name: string;
    inviteCode?: string;
    members?: any[];
    tasks?: any[];
    taskTypes?: any[];
    pets?: any[];
    houseType?: any;
    createdAt: string;
    updatedAt: string;
}

export interface CreateHouseholdRequest {
    name: string;
    houseTypeId?: string;
    pets?: { name: string; kind: string }[];
}

export interface JoinHouseholdRequest {
    inviteCode: string;
}