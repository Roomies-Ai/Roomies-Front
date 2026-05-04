import type { Task } from "./TaskItem.types";

export interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    households: any[];
    onAdd: (householdId: string, taskData: any) => void;
    onUpdate?: (taskId: string, updates: any) => void;
    onDelete?: (taskId: string) => void;
    onRefresh?: () => void;
    taskToEdit?: Task;
}

export interface ManualTaskFormProps {
    title: string;
    setTitle: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    points: number;
    setPoints: (val: number) => void;
    dueDate: string;
    setDueDate: (val: string) => void;
    selectedAssignee: string | null;
    setSelectedAssignee: (val: string | null) => void;
    selectedTaskType: string | number | null;
    setSelectedTaskType: (val: string | number | null) => void;
    activeHousehold: any;
    isAddingType: boolean;
    setIsAddingType: (val: boolean) => void;
    newTypeName: string;
    setNewTypeName: (val: string) => void;
    isCreatingType: boolean;
    handleAddType: () => void;
    onSubmit: () => void;
    onDelete?: () => void;
    isEdit: boolean;
}

export interface AiTaskSectionProps {
    aiMessage: string;
    setAiMessage: (val: string) => void;
    isParsing: boolean;
    handleAiParse: () => void;
    suggestions: any[];
    setSuggestions: (val: any[] | ((prev: any[]) => any[])) => void;
    handleToggleSuggestion: (index: number) => void;
    handleConfirmAi: () => void;
}

export interface HouseholdSelectorProps {
    households: any[];
    selectedHousehold: string;
    setSelectedHousehold: (val: string) => void;
}

export interface ModeSwitcherProps {
    mode: 'MANUAL' | 'AI';
    setMode: (mode: 'MANUAL' | 'AI') => void;
}

export interface PointsSelectorProps {
    points: number;
    setPoints: (val: number) => void;
}

export interface DueDateSelectorProps {
    dueDate: string;
    setDueDate: (val: string) => void;
}

export interface AssigneeSelectorProps {
    selectedAssignee: string | null;
    setSelectedAssignee: (val: string | null) => void;
    members: any[];
}

export interface TaskTypeSelectorProps {
    selectedTaskType: string | number | null;
    setSelectedTaskType: (val: string | number | null) => void;
    taskTypes: any[];
    isAddingType: boolean;
    setIsAddingType: (val: boolean) => void;
    newTypeName: string;
    setNewTypeName: (val: string) => void;
    isCreatingType: boolean;
    handleAddType: () => void;
}

export interface AiTaskGeneratorFormProps {
    aiMessage: string;
    setAiMessage: (val: string) => void;
    isParsing: boolean;
    handleAiParse: () => void;
}

export interface AiTaskSuggestionsListProps {
    suggestions: any[];
    handleToggleSuggestion: (index: number) => void;
    setSuggestions: (val: any[] | ((prev: any[]) => any[])) => void;
    setAiMessage: (val: string) => void;
    handleConfirmAi: () => void;
}
