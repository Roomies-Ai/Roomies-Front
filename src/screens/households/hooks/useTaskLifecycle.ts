import { useState } from 'react';
import { taskApi } from '../../../api/task.api';

export const useTaskLifecycle = (household: any, setHousehold: any, refresh: (silent?: boolean) => void) => {
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<any>(null);

    const handleAddTask = async (householdId: string, taskData: any) => {
        const tempTasks = Array.isArray(taskData) ? taskData : [taskData];
        const optimisticTasks = tempTasks.map(t => ({
            ...t,
            id: `temp-${Math.random()}`,
            status: t.status || 'pending',
            assignee: typeof t.assignee === 'string' 
                ? household.members?.find((m: any) => m.username === t.assignee) 
                : t.assignee
        }));

        setHousehold((prev: any) => ({
            ...prev,
            tasks: [...(prev.tasks || []), ...optimisticTasks]
        }));

        try {
            if (Array.isArray(taskData)) {
                await taskApi.bulkCreate(householdId, taskData);
            } else {
                await taskApi.bulkCreate(householdId, [taskData]);
            }
            await refresh(true);
        } catch (err) {
            console.error('Failed to add task:', err);
            refresh(true);
        }
    };

    const handleUpdateTask = async (taskId: string, updates: any) => {
        if ('assignee' in updates && updates.assignee && !updates.status) {
            updates.status = 'in-progress';
        }

        setHousehold((prev: any) => ({
            ...prev,
            tasks: prev.tasks.map((t: any) => {
                if (t.id === taskId) {
                    let resolvedAssignee = t.assignee;
                    if (updates.assignee !== undefined) {
                        resolvedAssignee = prev.members?.find((m: any) => m.username === updates.assignee || m.id === updates.assignee) || null;
                    }
                    let resolvedTaskType = t.taskType;
                    if (updates.taskType !== undefined) {
                        resolvedTaskType = prev.taskTypes?.find((tt: any) => tt.id === updates.taskType || tt.name === updates.taskType) || t.taskType;
                    }
                    return { ...t, ...updates, assignee: resolvedAssignee, taskType: resolvedTaskType };
                }
                return t;
            })
        }));

        try {
            await taskApi.updateTask(taskId, updates);
            await refresh(true);
        } catch (err) {
            console.error('Failed to update task:', err);
            refresh(true);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        setHousehold((prev: any) => ({
            ...prev,
            tasks: prev.tasks.filter((t: any) => t.id !== taskId)
        }));

        try {
            await taskApi.deleteTask(taskId);
            await refresh(true);
        } catch (err) {
            console.error('Failed to delete task:', err);
            refresh(true);
        }
    };

    return {
        isAddTaskModalOpen, setIsAddTaskModalOpen,
        taskToEdit, setTaskToEdit,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask
    };
};
