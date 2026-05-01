export interface Household {
    id: string;
    name: string;
    inviteCode?: string;
    members?: any[];
    tasks?: any[];
    houseType?: any;
    createdAt: string;
    updatedAt: string;
}

export interface CreateHouseholdRequest {
    name: string;
}

export interface JoinHouseholdRequest {
    inviteCode: string;
}
