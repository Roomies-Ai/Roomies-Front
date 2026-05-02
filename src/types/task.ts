export interface SuggestedTask {
    title: string;
    description: string;
    points: number;
    status: string;
    taskType?: string;
    dueDate?: string;
}

export interface Step4SuggestedTask extends SuggestedTask {
    approved: boolean;
    isCustom?: boolean;
}
