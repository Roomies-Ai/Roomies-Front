import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { householdApi } from '../../../api/household.api';
import { taskApi } from '../../../api/task.api';

export const useHouseholdDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const currentUser = useAppSelector((state) => state.auth.user);
    const [household, setHousehold] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'OPEN' | 'IN_PROGRESS' | 'DONE'>('OPEN');
    const [searchQuery, setSearchQuery] = useState('');
    const [assigningTaskId, setAssigningTaskId] = useState<string | null>(null);
    const [editingPointsTaskId, setEditingPointsTaskId] = useState<string | null>(null);
    const [pointsValue, setPointsValue] = useState<number>(1);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestion, setSuggestion] = useState<any>(null);

    const fetchDetail = async () => {
        if (!id) return;
        try {
            const data = await householdApi.getHouseholdById(id);
            setHousehold(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load household details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    useEffect(() => {
        if (assigningTaskId || editingPointsTaskId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [assigningTaskId, editingPointsTaskId]);

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
            await fetchDetail();
        } catch (err: any) {
            console.error('Failed to update points:', err);
            fetchDetail();
        }
    };

    const handleUpdateTaskStatus = async (taskId: string, currentStatus: string) => {
        try {
            const status = currentStatus?.toLowerCase();
            const nextStatus = status === 'completed' ? 'in-progress' : 'completed';
            
            setHousehold((prev: any) => ({
                ...prev,
                tasks: prev.tasks.map((t: any) => 
                    t.id === taskId ? { ...t, status: nextStatus } : t
                )
            }));

            await taskApi.updateTask(taskId, { status: nextStatus });
            await fetchDetail();
        } catch (err: any) {
            console.error('Failed to update task status:', err);
            fetchDetail();
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
            await fetchDetail();
        } catch (err: any) {
            console.error('Failed to assign task:', err);
            fetchDetail();
        }
    };

    const formatRelativeDate = (dateString: string) => {
        if (!dateString) return 'Today';
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return date.toLocaleDateString();
    };

    const getMemberStats = (memberId: string) => {
        const memberTasks = household.tasks.filter((t: any) => t.assignee?.id === memberId);
        const points = memberTasks
            .filter((t: any) => t.status?.toLowerCase() === 'completed')
            .reduce((sum: number, t: any) => sum + (t.points || 0), 0);
        return { taskCount: memberTasks.length, points };
    };

    const filteredTasks = household?.tasks?.filter((task: any) => {
        const status = task.status?.toLowerCase();
        const matchesTab = 
            (activeTab === 'OPEN' && status === 'pending') ||
            (activeTab === 'IN_PROGRESS' && status === 'in-progress') ||
            (activeTab === 'DONE' && status === 'completed');
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    }) || [];

    return {
        id,
        navigate,
        currentUser,
        household,
        loading,
        error,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        assigningTaskId,
        setAssigningTaskId,
        editingPointsTaskId,
        setEditingPointsTaskId,
        pointsValue,
        setPointsValue,
        isSuggesting,
        suggestion,
        setSuggestion,
        handleGetSuggestion,
        handleUpdatePoints,
        handleUpdateTaskStatus,
        handleAssignTask,
        formatRelativeDate,
        getMemberStats,
        filteredTasks,
    };
};
