import { useState } from 'react';
import type { Task } from '../types/tasks.types';

export const useTasksUI = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
    const [expandedHouseholds, setExpandedHouseholds] = useState<Record<string, boolean>>({});

    const openEditModal = (task: Task) => {
        setTaskToEdit(task);
        setIsAddModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setTaskToEdit(undefined);
    };

    const toggleHousehold = (id: string) => {
        setExpandedHouseholds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return {
        isAddModalOpen,
        setIsAddModalOpen,
        taskToEdit,
        openEditModal,
        handleCloseModal,
        expandedHouseholds,
        toggleHousehold
    };
};
