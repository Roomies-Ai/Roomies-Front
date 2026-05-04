export interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    points: number;
    dueDate?: string;
    createdAt: string;
    assignee?: {
        id: string | number;
        username: string;
    };
    taskType?: {
        id: string | number;
        name: string;
    };
}

export interface TaskItemProps {
    task: Task;
    onToggle: () => void;
    onEdit: () => void;
    showComplete?: boolean;
}

export interface TaskItemHeaderProps {
    task: Task;
    isCompleted: boolean;
    isProgress: boolean;
    onEdit: () => void;
    onToggle: () => void;
    showComplete: boolean;
}

export interface TaskItemFooterProps {
    task: Task;
}
