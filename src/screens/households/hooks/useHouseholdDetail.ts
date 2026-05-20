import { useEffect, useMemo } from 'react';
import { useHouseholdBase } from './useHouseholdBase';
import { useHouseholdTasks } from './useHouseholdTasks';
import { useHouseholdUI } from './useHouseholdUI';
import { useHouseholdActions } from './useHouseholdActions';

export const useHouseholdDetail = () => {
    const base = useHouseholdBase();
    const tasks = useHouseholdTasks(base.household, base.setHousehold, base.refresh);
    const ui = useHouseholdUI(base.household);
    const actions = useHouseholdActions(base.id, base.currentUser, base.navigate, base.setLoading, base.setError);

    // Modal scroll lock
    useEffect(() => {
        if (tasks.assigningTaskId || tasks.editingPointsTaskId || tasks.isAddTaskModalOpen || actions.isLeaveModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [tasks.assigningTaskId, tasks.editingPointsTaskId, tasks.isAddTaskModalOpen, actions.isLeaveModalOpen]);

    return useMemo(() => ({
        ...base,
        ...tasks,
        ...ui,
        ...actions
    }), [base, tasks, ui, actions]);
};
