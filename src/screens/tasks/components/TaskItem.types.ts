import type { Task } from '../types/tasks.types';

export interface TaskItemProps {
    task: Task;
    onToggle: () => void;
    onEdit: () => void;
    onAssignClick?: () => void;
    showComplete?: boolean;
}

export interface TaskItemHeaderProps {
    task: Task;
    isCompleted: boolean;
    isProgress: boolean;
    isOverdue: boolean;
    onEdit: () => void;
    onToggle: () => void;
    showComplete: boolean;
    onToggleExpand?: (e: React.MouseEvent) => void;
    isExpanded?: boolean;
}

export interface TaskItemFooterProps {
    task: Task;
    onAssignClick?: () => void;
    isOverdue: boolean;
}
