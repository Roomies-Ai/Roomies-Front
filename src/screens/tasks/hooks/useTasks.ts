import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { householdApi } from '../../../api/household.api';
import { taskApi } from '../../../api/task.api';
import { useTaskActions } from './useTaskActions';
import type { HouseholdTasks, TaskFilter } from '../types/tasks.types';

export const useTasks = () => {
    const currentUser = useAppSelector((state) => state.auth.user);
    const [households, setHouseholds] = useState<HouseholdTasks[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<TaskFilter>('ME');

    const [loadingHouseholds, setLoadingHouseholds] = useState<Record<string, boolean>>({});

    const fetchData = useCallback(async (isSilent = false) => {
        try {
            if (!isSilent) setLoading(true);
            
            if (filter === 'ME') {
                // Optimized: Fetch ONLY tasks assigned to ME across all households
                const [householdsList, myTasks] = await Promise.all([
                    householdApi.getMyHouseholds(false), // Just names and IDs
                    taskApi.getMyTasks()
                ]);

                // Map tasks to their respective households
                const householdsWithMyTasks = householdsList.map(h => {
                    const filteredTasks = myTasks.filter(t => t.household?.id === h.id);
                    return {
                        ...h,
                        tasks: filteredTasks,
                        taskCount: filteredTasks.length, // Show count of MY tasks in this mode
                        members: h.members || [], 
                        taskTypes: h.taskTypes || []
                    };
                }).filter(h => h.tasks.length > 0);

                setHouseholds(householdsWithMyTasks);
            } else {
                // ALL Tasks: Load household list first, tasks will be lazy-loaded on expansion
                const list = await householdApi.getMyHouseholds(false);
                setHouseholds(list.map(h => ({ ...h, tasks: h.tasks || [] })));
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, [filter]);

    const fetchHouseholdTasks = async (householdId: string) => {
        try {
            // Check if already loaded to avoid redundant calls
            const current = households.find(h => h.id === householdId);
            if (current && ((current.members?.length ?? 0) > 0 || (current.taskTypes?.length ?? 0) > 0)) return;

            setLoadingHouseholds(prev => ({ ...prev, [householdId]: true }));
            const full = await householdApi.getHouseholdById(householdId);
            setHouseholds(prev => prev.map(h => 
                h.id === householdId ? { ...h, ...full } : h
            ));
        } catch (err) {
            console.error(`Failed to lazy load tasks for household ${householdId}:`, err);
        } finally {
            setLoadingHouseholds(prev => ({ ...prev, [householdId]: false }));
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredHouseholds = useMemo(() => {
        if (filter === 'ME') return households; 
        return households; 
    }, [households, filter]);

    // Hook separation: Actions are managed in a dedicated sub-hook
    const {
        handleUpdateTaskStatus,
        handleUpdateTask,
        handleAddTask,
        handleDeleteTask
    } = useTaskActions({ setHouseholds, refresh: fetchData });

    return {
        currentUser,
        filteredHouseholds,
        filter,
        setFilter,
        loading,
        loadingHouseholds,
        error,
        handleUpdateTaskStatus,
        handleUpdateTask,
        handleAddTask,
        handleDeleteTask,
        fetchHouseholdTasks,
        refresh: fetchData,
        allHouseholds: households
    };
};
