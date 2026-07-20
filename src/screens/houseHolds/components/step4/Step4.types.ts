import type { SuggestedTask, Step4SuggestedTask } from '../../../../types/task';

export interface TaskItemProps {
    task: Step4SuggestedTask;
    index: number;
    onToggle: (index: number) => void;
    onUpdate: (index: number, updates: Partial<SuggestedTask>) => void;
    onRemove: (index: number) => void;
}

export interface PointsControlProps {
    points: number;
    onChange: (points: number) => void;
}

export interface AddTaskButtonProps {
    onClick: () => void;
}

export interface FinishButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean;
}
