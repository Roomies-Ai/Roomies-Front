export interface SearchResultTask {
    id: string;
    title: string;
    status: string;
    dueDate?: string;
    householdId: string;
    householdName: string;
}

export interface SearchResultHousehold {
    id: string;
    name: string;
    memberCount: number;
}

export interface SearchResultMember {
    id: string;
    username: string;
    profilePicture?: string;
    householdId: string;
    householdName: string;
}

export interface GlobalSearchResults {
    tasks: SearchResultTask[];
    households: SearchResultHousehold[];
    members: SearchResultMember[];
    isLoading: boolean;
}
