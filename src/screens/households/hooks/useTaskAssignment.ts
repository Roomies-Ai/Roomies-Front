import { useState } from 'react';
import { taskApi } from '../../../api/task.api';

export const useTaskAssignment = (household: any, setHousehold: any, refresh: (silent?: boolean) => void) => {
    const [assigningTaskId, setAssigningTaskId] = useState<string | null>(null);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestion, setSuggestion] = useState<any>(null);

    const handleGetSuggestion = async () => {
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
    };

    const handleAssignTask = async (taskId: string, memberId: string | null) => {
        try {
            const task = household.tasks.find((t: any) => t.id === taskId);
            const member = household.members.find((m: any) => m.id === memberId);
            
            let nextStatus = task.status;
            if (memberId) {
                if (task.status?.toLowerCase() === 'pending') {
                    nextStatus = 'in-progress';
                }
            } else {
                nextStatus = 'pending';
            }

            setHousehold((prev: any) => ({
                ...prev,
                tasks: prev.tasks.map((t: any) => 
                    t.id === taskId ? { ...t, assignee: member || null, status: nextStatus } : t
                )
            }));

            setAssigningTaskId(null);
            setSuggestion(null);

            await taskApi.updateTask(taskId, { 
                assignee: memberId ? { id: memberId } : null,
                status: nextStatus
            });
            await refresh(true);
        } catch (err: any) {
            console.error('Failed to assign task:', err);
            refresh(true);
        }
    };

    return {
        assigningTaskId, setAssigningTaskId,
        isSuggesting,
        suggestion, setSuggestion,
        handleGetSuggestion,
        handleAssignTask
    };
};
