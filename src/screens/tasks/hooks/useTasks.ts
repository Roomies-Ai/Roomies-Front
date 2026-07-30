import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
    const loadedHouseholdIds = useRef<Set<string>>(new Set());

    const fetchData = useCallback(async (isSilent = false) => {
        loadedHouseholdIds.current = new Set();
        try {
            if (!isSilent) setLoading(true);
            
            if (filter === 'ME') {
                const [householdsList, myTasks] = await Promise.all([
                    householdApi.getMyHouseholds(false),
                    taskApi.getMyTasks()
                ]);

                const householdsWithMyTasks = householdsList.map(h => {
                    const filteredTasks = myTasks.filter(t => t.household?.id === h.id)
                        .sort((a, b) => {
                            if (!a.dueDate) return 1;
                            if (!b.dueDate) return -1;
                            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                        });
                    return {
                        ...h,
                        tasks: filteredTasks,
                        taskCount: filteredTasks.length,
                        members: h.members || [], 
                        taskTypes: h.taskTypes || []
                    };
                }).filter(h => h.tasks.length > 0);

                setHouseholds(householdsWithMyTasks);
            } else {
                const list = await householdApi.getMyHouseholds(false);
                setHouseholds(list.map(h => ({
                    ...h,
                    tasks: (h.tasks || []).sort((a: any, b: any) => {
                        if (!a.dueDate) return 1;
                        if (!b.dueDate) return -1;
                        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                    })
                })));
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, [filter]);

    const fetchHouseholdTasks = useCallback(async (householdId: string) => {
        if (filter === 'ME') return;
        if (loadedHouseholdIds.current.has(householdId)) return;

        setLoadingHouseholds(prev => ({ ...prev, [householdId]: true }));
        try {
            const full = await householdApi.getHouseholdById(householdId);
            loadedHouseholdIds.current.add(householdId);
            setHouseholds(prev => prev.map(h => {
                if (h.id === householdId) {
                    const sortedTasks = (full.tasks || []).sort((a: any, b: any) => {
                        if (!a.dueDate) return 1;
                        if (!b.dueDate) return -1;
                        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                    });
                    return { ...h, ...full, tasks: sortedTasks };
                }
                return h;
            }));
        } catch (err) {
            console.error(`Failed to lazy load tasks for household ${householdId}:`, err);
        } finally {
            setLoadingHouseholds(prev => ({ ...prev, [householdId]: false }));
        }
    }, [filter]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const {
        handleUpdateTaskStatus,
        handleUpdateTask,
        handleAddTask,
        handleDeleteTask
    } = useTaskActions({ setHouseholds, refresh: fetchData });

    return useMemo(() => ({
        currentUser,
        filteredHouseholds: households,
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
    }), [currentUser, households, filter, setFilter, loading, loadingHouseholds, error,
        handleUpdateTaskStatus, handleUpdateTask, handleAddTask, handleDeleteTask,
        fetchHouseholdTasks, fetchData]);
};
