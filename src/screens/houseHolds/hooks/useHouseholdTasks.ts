import { useMemo } from 'react';
import { useTaskAssignment } from './useTaskAssignment';
import { useTaskUpdates } from './useTaskUpdates';
import { useTaskLifecycle } from './useTaskLifecycle';

export const useHouseholdTasks = (household: any, setHousehold: any, refresh: (silent?: boolean) => void) => {
    const assignment = useTaskAssignment(household, setHousehold, refresh);
    const updates = useTaskUpdates(setHousehold, refresh);
    const lifecycle = useTaskLifecycle(household, setHousehold, refresh);

    return useMemo(() => ({
        ...assignment,
        ...updates,
        ...lifecycle
    }), [assignment, updates, lifecycle]);
};
