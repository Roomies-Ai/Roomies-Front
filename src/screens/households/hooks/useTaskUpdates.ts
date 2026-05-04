import { useState } from 'react';
import { taskApi } from '../../../api/task.api';

export const useTaskUpdates = (setHousehold: any, refresh: (silent?: boolean) => void) => {
    const [editingPointsTaskId, setEditingPointsTaskId] = useState<string | null>(null);
    const [pointsValue, setPointsValue] = useState(5);

    const handleUpdatePoints = async (taskId: string, points: number) => {
        try {
            setHousehold((prev: any) => ({
                ...prev,
                tasks: prev.tasks.map((t: any) => 
                    t.id === taskId ? { ...t, points } : t
                )
            }));
            setEditingPointsTaskId(null);
            await taskApi.updateTask(taskId, { points });
            await refresh(true);
        } catch (err: any) {
            console.error('Failed to update points:', err);
            refresh(true);
        }
    };

    const handleUpdateTaskStatus = async (taskId: string, currentStatus: string) => {
        const nextStatus = currentStatus?.toLowerCase() === 'completed' ? 'in-progress' : 'completed';
        setHousehold((prev: any) => ({
            ...prev,
            tasks: prev.tasks.map((t: any) => 
                t.id === taskId ? { ...t, status: nextStatus } : t
            )
        }));

        try {
            await taskApi.updateTask(taskId, { status: nextStatus });
            await refresh(true);
        } catch (err: any) {
            console.error('Failed to update status:', err);
            refresh(true);
        }
    };

    return {
        editingPointsTaskId, setEditingPointsTaskId,
        pointsValue, setPointsValue,
        handleUpdatePoints,
        handleUpdateTaskStatus
    };
};
