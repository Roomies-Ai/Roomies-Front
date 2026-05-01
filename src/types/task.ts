export interface SuggestedTask {
    title: string;
    description: string;
    points: number;
    status: string;
}

export interface Step4SuggestedTask extends SuggestedTask {
    approved: boolean;
    isCustom?: boolean;
}
