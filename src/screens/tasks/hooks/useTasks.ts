import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { useLazyGetMyHouseholdsQuery, useLazyGetHouseholdByIdQuery } from '../../../api/household.api';
import { taskApi } from '../../../api/task.api';
import { useTaskActions } from './useTaskActions';
import { useTasksAssignment } from './useTasksAssignment';
import type { HouseholdTasks, TaskFilter } from '../types/tasks.types';

export const useTasks = () => {
    const currentUser = useAppSelector((state) => state.auth.user);
    const [getMyHouseholds] = useLazyGetMyHouseholdsQuery();
    const [getHouseholdById] = useLazyGetHouseholdByIdQuery();
    const [households, setHouseholds] = useState<HouseholdTasks[]>([]);
    const [allHouseholdsRaw, setAllHouseholdsRaw] = useState<HouseholdTasks[]>([]);
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
                    getMyHouseholds(false).unwrap(),
                    taskApi.getMyTasks()
                ]);

                const allWithTasks = householdsList.map(h => {
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
                });

                setAllHouseholdsRaw(allWithTasks);
                setHouseholds(allWithTasks.filter(h => h.tasks.length > 0));
            } else {
                const list = await getMyHouseholds(false).unwrap();
                const withTasks = list.map(h => ({
                    ...h,
                    tasks: [...(h.tasks || [])].sort((a: any, b: any) => {
                        if (!a.dueDate) return 1;
                        if (!b.dueDate) return -1;
                        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                    })
                }));
                setAllHouseholdsRaw(withTasks);
                setHouseholds(withTasks);
            }
        } catch (err: any) {
            setError(err.data?.message || err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, [filter, getMyHouseholds]);

    const fetchHouseholdTasks = useCallback(async (householdId: string) => {
        if (filter === 'ME') return;
        if (loadedHouseholdIds.current.has(householdId)) return;

        setLoadingHouseholds(prev => ({ ...prev, [householdId]: true }));
        try {
            const full = await getHouseholdById(householdId).unwrap();
            loadedHouseholdIds.current.add(householdId);
            setHouseholds(prev => prev.map(h => {
                if (h.id === householdId) {
                    const sortedTasks = [...(full.tasks || [])].sort((a: any, b: any) => {
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
    }, [filter, getHouseholdById]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const {
        handleUpdateTaskStatus,
        handleUpdateTask,
        handleAddTask,
        handleDeleteTask,
        handleClearRecurrence,
    } = useTaskActions({ setHouseholds, refresh: fetchData });

    const {
        assigningTaskId,
        assigningHousehold,
        isLoadingHousehold,
        openAssignModal,
        closeAssignModal,
        isSuggesting,
        suggestion, setSuggestion,
        handleGetSuggestion,
        handleAssignTask
    } = useTasksAssignment(households, setHouseholds, fetchData);

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
        handleClearRecurrence,
        fetchHouseholdTasks,
        refresh: fetchData,
        allHouseholds: allHouseholdsRaw,
        assigningTaskId,
        assigningHousehold,
        isLoadingHousehold,
        openAssignModal,
        closeAssignModal,
        isSuggesting,
        suggestion, setSuggestion,
        handleGetSuggestion,
        handleAssignTask
    }), [currentUser, households, allHouseholdsRaw, filter, setFilter, loading, loadingHouseholds, error,
        handleUpdateTaskStatus, handleUpdateTask, handleAddTask, handleDeleteTask,
        handleClearRecurrence, fetchHouseholdTasks, fetchData,
        assigningTaskId, assigningHousehold, isLoadingHousehold, openAssignModal, closeAssignModal,
        isSuggesting, suggestion, setSuggestion, handleGetSuggestion, handleAssignTask]);
};
