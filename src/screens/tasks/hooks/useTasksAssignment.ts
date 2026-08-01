import { useState, useCallback, useRef, useMemo } from 'react';
import { taskApi } from '../../../api/task.api';
import { useLazyGetHouseholdByIdQuery } from '../../../api/household.api';
import type { HouseholdTasks } from '../types/tasks.types';

export const useTasksAssignment = (
    households: HouseholdTasks[],
    setHouseholds: React.Dispatch<React.SetStateAction<HouseholdTasks[]>>,
    refresh: (silent?: boolean) => void
) => {
    const [getHouseholdById] = useLazyGetHouseholdByIdQuery();
    const householdDetailCache = useRef<Record<string, HouseholdTasks>>({});

    const [assigningTaskId, setAssigningTaskIdState] = useState<string | null>(null);
    const [assigningHousehold, setAssigningHousehold] = useState<HouseholdTasks | null>(null);
    const [isLoadingHousehold, setIsLoadingHousehold] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestion, setSuggestion] = useState<any>(null);

    const closeAssignModal = useCallback(() => {
        setAssigningTaskIdState(null);
        setAssigningHousehold(null);
        setSuggestion(null);
    }, []);

    const openAssignModal = useCallback(async (taskId: string) => {
        setSuggestion(null);
        setAssigningTaskIdState(taskId);
        setAssigningHousehold(null);

        const owner = households.find(h => h.tasks?.some(t => t.id === taskId));
        if (!owner) return;

        if (householdDetailCache.current[owner.id]) {
            setAssigningHousehold(householdDetailCache.current[owner.id]);
            return;
        }

        setIsLoadingHousehold(true);
        try {
            const full = await getHouseholdById(owner.id).unwrap();
            const withTasks: HouseholdTasks = { ...(full as any), tasks: (full as any).tasks || [] };
            householdDetailCache.current[owner.id] = withTasks;
            setAssigningHousehold(withTasks);
        } catch (err) {
            console.error('Failed to load household for assignment:', err);
            setAssigningHousehold(owner);
        } finally {
            setIsLoadingHousehold(false);
        }
    }, [households, getHouseholdById]);

    const handleGetSuggestion = useCallback(async () => {
        if (!assigningTaskId) return;
        setIsSuggesting(true);
        try {
            const suggestions = await taskApi.getFairnessSuggestions(assigningTaskId);
            const best = suggestions.sort((a: any, b: any) => b.score - a.score)[0];
            setSuggestion(best);
        } catch (err) {
            console.error('Failed to get suggestion:', err);
        } finally {
            setIsSuggesting(false);
        }
    }, [assigningTaskId]);

    const handleAssignTask = useCallback(async (taskId: string, memberId: string | null) => {
        try {
            const member = assigningHousehold?.members?.find((m: any) => String(m.id) === String(memberId)) || null;

            let currentStatus: string | undefined;
            households.some(h => {
                const found = h.tasks?.find((t: any) => t.id === taskId);
                if (found) currentStatus = found.status;
                return !!found;
            });

            let nextStatus = currentStatus;
            if (memberId) {
                if (currentStatus?.toLowerCase() === 'pending') nextStatus = 'in-progress';
            } else {
                nextStatus = 'pending';
            }

            setHouseholds(prev => prev.map(h => ({
                ...h,
                tasks: h.tasks?.map((t: any) =>
                    t.id === taskId ? { ...t, assignee: member, status: nextStatus } : t
                )
            })));

            closeAssignModal();

            await taskApi.updateTask(taskId, {
                assignee: memberId ? { id: memberId } : null,
                status: nextStatus
            });
            await refresh(true);
        } catch (err) {
            console.error('Failed to assign task:', err);
            refresh(true);
        }
    }, [households, assigningHousehold, setHouseholds, refresh, closeAssignModal]);

    return useMemo(() => ({
        assigningTaskId,
        assigningHousehold,
        isLoadingHousehold,
        openAssignModal,
        closeAssignModal,
        isSuggesting,
        suggestion, setSuggestion,
        handleGetSuggestion,
        handleAssignTask
    }), [assigningTaskId, assigningHousehold, isLoadingHousehold, openAssignModal, closeAssignModal,
        isSuggesting, suggestion, handleGetSuggestion, handleAssignTask]);
};
