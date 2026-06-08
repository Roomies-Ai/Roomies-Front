export interface RecurrenceRule {
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    interval: number;
    daysOfWeek?: number[];
    timeOfDay?: string;
    endDate?: string;
}

export interface TaskType {
    id: string | number;
    name: string;
    householdId?: string;
}

export interface TaskMember {
    id: string | number;
    username: string;
    profilePicture?: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    points: number;
    dueDate?: string;
    createdAt: string;
    assignee?: TaskMember | null;
    taskType?: TaskType | null;
    priority?: string;
    householdId?: string;
    household?: {
        id: string;
        name: string;
    };
    recurrenceRule?: RecurrenceRule | null;
    recurrenceParentId?: string | null;
}

export interface HouseholdTasks {
    id: string;
    name: string;
    tasks: Task[];
    taskCount?: number;
    members?: TaskMember[];
    taskTypes?: TaskType[];
}

export type TaskFilter = 'ME' | 'ALL';

export interface UseTaskActionsProps {
    setHouseholds: React.Dispatch<React.SetStateAction<HouseholdTasks[]>>;
    refresh: (isSilent?: boolean) => Promise<void>;
}
