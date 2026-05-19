import { taskApi } from '../../../api/task.api';
import type { Task, UseTaskActionsProps } from '../types/tasks.types';

export const useTaskActions = ({ setHouseholds, refresh }: UseTaskActionsProps) => {
    const handleUpdateTaskStatus = async (taskId: string, currentStatus: string) => {
        const nextStatus = currentStatus?.toLowerCase() === 'completed' ? 'in-progress' : 'completed';
        
        // Optimistic Update
        setHouseholds(prev => prev.map(h => ({
            ...h,
            tasks: h.tasks?.map((t: Task) => 
                t.id === taskId ? { ...t, status: nextStatus } : t
            )
        })));

        try {
            const updatedTask = await taskApi.updateTask(taskId, { status: nextStatus });
            // Sync with final server state (handles auto-fields)
            setHouseholds(prev => prev.map(h => ({
                ...h,
                tasks: h.tasks?.map((t: any) => 
                    t.id === taskId ? { ...t, ...updatedTask } : t
                )
            })));
        } catch (err) {
            console.error('Failed to update task:', err);
            await refresh(true); // Rollback to server state on error
        }
    };

    const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
        // If assignee is being changed, and it's not null, auto-set to in-progress
        if ('assignee' in updates && updates.assignee && !updates.status) {
            updates.status = 'in-progress';
        }

        // Optimistic Update
        setHouseholds(prev => prev.map(h => ({
            ...h,
            tasks: h.tasks?.map((t: Task) => {
                if (t.id === taskId) {
                    let resolvedAssignee = t.assignee;
                    if (updates.assignee !== undefined) {
                        resolvedAssignee = h.members?.find((m: any) => m.username === (updates.assignee as unknown as string) || m.id === (updates.assignee as unknown as string)) || null;
                    }
                    let resolvedTaskType = t.taskType;
                    if (updates.taskType !== undefined) {
                        resolvedTaskType = h.taskTypes?.find((tt: any) => tt.id === (updates.taskType as unknown as string) || tt.name === (updates.taskType as unknown as string)) || t.taskType;
                    }
                    return { ...t, ...updates, assignee: resolvedAssignee, taskType: resolvedTaskType } as Task;
                }
                return t;
            })
        })));

        try {
            const updatedTask = await taskApi.updateTask(taskId, updates);
            setHouseholds(prev => prev.map(h => ({
                ...h,
                tasks: h.tasks?.map((t: any) => 
                    t.id === taskId ? { ...t, ...updatedTask } : t
                )
            })));
        } catch (err) {
            console.error('Failed to update task:', err);
            await refresh(true);
        }
    };

    const handleAddTask = async (householdId: string, taskData: any) => {
        try {
            let savedTasks: any[];
            if (Array.isArray(taskData)) {
                savedTasks = await taskApi.bulkCreate(householdId, taskData);
            } else {
                savedTasks = await taskApi.bulkCreate(householdId, [taskData]);
            }
            
            // Add real tasks from server to state (avoiding full refetch)
            setHouseholds(prev => prev.map(h => {
                if (h.id === householdId) {
                    return {
                        ...h,
                        tasks: [...(h.tasks || []), ...savedTasks]
                    };
                }
                return h;
            }));
        } catch (err) {
            console.error('Failed to add task:', err);
            refresh(true);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        // Optimistic Update
        setHouseholds(prev => prev.map(h => ({
            ...h,
            tasks: h.tasks?.filter((t: any) => t.id !== taskId)
        })));

        try {
            await taskApi.deleteTask(taskId);
        } catch (err) {
            console.error('Failed to delete task:', err);
            await refresh(true);
        }
    };

    return {
        handleUpdateTaskStatus,
        handleUpdateTask,
        handleAddTask,
        handleDeleteTask
    };
};
