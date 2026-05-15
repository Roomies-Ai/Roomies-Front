export interface TaskTypeOption {
    id: string;
    name: string;
    householdId: string;
    householdName: string;
}

export interface PreferredTasksModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    onUpdate: (updatedUser: any) => void;
}

export interface PreferredTasksHeaderProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    fetching: boolean;
    onClose: () => void;
}

export interface PreferredTasksListProps {
    fetching: boolean;
    filteredTypes: TaskTypeOption[];
    selectedIds: string[];
    toggleType: (id: string) => void;
}

export interface PreferredTasksFooterProps {
    onClose: () => void;
    onSave: () => void;
    loading: boolean;
    fetching: boolean;
    selectedCount: number;
}
