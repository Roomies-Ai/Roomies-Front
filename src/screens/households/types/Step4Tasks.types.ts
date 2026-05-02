import type { SuggestedTask, Step4SuggestedTask } from '../../../types/task';

export interface Step4TasksProps {
    tasks: Step4SuggestedTask[];
    isGenerating: boolean;
    onToggleTask: (index: number) => void;
    onUpdateTask: (index: number, updates: Partial<SuggestedTask>) => void;
    onAddTask: () => void;
    onRemoveTask: (index: number) => void;
    onFinish: () => void;
    isLoading: boolean;
}
