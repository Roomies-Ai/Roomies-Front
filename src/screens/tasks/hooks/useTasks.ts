import { useState, useEffect, useMemo } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { householdApi } from '../../../api/household.api';
import { taskApi } from '../../../api/task.api';

export const useTasks = () => {
    const currentUser = useAppSelector((state) => state.auth.user);
    const [households, setHouseholds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'ME' | 'ALL'>('ME');

    const fetchData = async (isSilent = false) => {
        try {
            if (!isSilent) setLoading(true);
            const data = await householdApi.getMyHouseholds();
            setHouseholds(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredHouseholds = useMemo(() => {
        return households.map(h => ({
            ...h,
            tasks: h.tasks?.filter((t: any) => {
                if (filter === 'ALL') return true;
                return String(t.assignee?.id) === String(currentUser?.id || currentUser?.userId);
            }) || []
        })).filter(h => h.tasks.length > 0);
    }, [households, currentUser, filter]);

    const handleUpdateTaskStatus = async (taskId: string, currentStatus: string) => {
        const nextStatus = currentStatus?.toLowerCase() === 'completed' ? 'in-progress' : 'completed';
        
        // Optimistic Update
        setHouseholds(prev => prev.map(h => ({
            ...h,
            tasks: h.tasks?.map((t: any) => 
                t.id === taskId ? { ...t, status: nextStatus } : t
            )
        })));

        try {
            await taskApi.updateTask(taskId, { status: nextStatus });
        } catch (err) {
            console.error('Failed to update task:', err);
            await fetchData(true);
        }
    };

    const handleUpdateTask = async (taskId: string, updates: any) => {
        // If assignee is being changed, and it's not null, auto-set to in-progress
        if ('assignee' in updates && updates.assignee && !updates.status) {
            updates.status = 'in-progress';
        }

        // Optimistic Update
        setHouseholds(prev => prev.map(h => ({
            ...h,
            tasks: h.tasks?.map((t: any) => {
                if (t.id === taskId) {
                    // Resolve assignee object if it's a string ID/username
                    let resolvedAssignee = t.assignee;
                    if (updates.assignee !== undefined) {
                        resolvedAssignee = h.members?.find((m: any) => m.username === updates.assignee || m.id === updates.assignee) || null;
                    }

                    // Resolve taskType object if it's a string ID
                    let resolvedTaskType = t.taskType;
                    if (updates.taskType !== undefined) {
                        resolvedTaskType = h.taskTypes?.find((tt: any) => tt.id === updates.taskType || tt.name === updates.taskType) || t.taskType;
                    }

                    return { 
                        ...t, 
                        ...updates, 
                        assignee: resolvedAssignee,
                        taskType: resolvedTaskType 
                    };
                }
                return t;
            })
        })));

        try {
            await taskApi.updateTask(taskId, updates);
            await fetchData(true); // Get fresh data from server
        } catch (err) {
            console.error('Failed to update task:', err);
            await fetchData(true);
        }
    };

    const handleAddTask = async (householdId: string, taskData: any) => {
        // Optimistic Update
        const tempTasks = Array.isArray(taskData) ? taskData : [taskData];
        const optimisticTasks = tempTasks.map(t => ({
            ...t,
            id: `temp-${Math.random()}`,
            status: t.status || 'pending',
            assignee: typeof t.assignee === 'string' 
                ? households.find(h => h.id === householdId)?.members?.find((m: any) => m.username === t.assignee) 
                : t.assignee
        }));

        setHouseholds(prev => prev.map(h => {
            if (h.id === householdId) {
                return {
                    ...h,
                    tasks: [...(h.tasks || []), ...optimisticTasks]
                };
            }
            return h;
        }));

        try {
            if (Array.isArray(taskData)) {
                await taskApi.bulkCreate(householdId, taskData);
            } else {
                await taskApi.bulkCreate(householdId, [taskData]);
            }
            await fetchData(true); // Silent refresh to get real IDs
        } catch (err) {
            console.error('Failed to add task:', err);
            fetchData(true); // Rollback on error
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
            await fetchData(true);
        } catch (err) {
            console.error('Failed to delete task:', err);
            await fetchData(true);
        }
    };

    return {
        currentUser,
        filteredHouseholds,
        filter,
        setFilter,
        loading,
        error,
        handleUpdateTaskStatus,
        handleUpdateTask,
        handleAddTask,
        handleDeleteTask,
        refresh: fetchData,
        allHouseholds: households
    };
};
