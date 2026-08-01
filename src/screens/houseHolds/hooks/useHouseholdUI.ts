import { useState, useMemo, useCallback } from 'react';

// Mirrors the overdue check used for the red styling on TaskCard/TaskItem: due
// date has passed (as of today) and the task isn't done yet. Kept in sync with
// the live due date rather than the backend's daily-cron `status` field so a
// task's tab always matches how it's actually rendered.
export const deriveTab = (task: any): 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'OVERDUE' => {
    const status = task.status?.toLowerCase();
    if (status === 'completed') return 'DONE';
    const isOverdue = task.dueDate && new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0);
    if (isOverdue) return 'OVERDUE';
    return task.assignee ? 'IN_PROGRESS' : 'OPEN';
};

export const useHouseholdUI = (household: any, targetTaskId?: string | null) => {
    const [activeTab, setActiveTab] = useState<'OPEN' | 'IN_PROGRESS' | 'DONE' | 'OVERDUE'>('OPEN');
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedTargetId, setAppliedTargetId] = useState<string | null>(null);

    if (household && targetTaskId && targetTaskId !== appliedTargetId) {
        const targetTask = household.tasks?.find((t: any) => t.id === targetTaskId);
        if (targetTask) {
            setActiveTab(deriveTab(targetTask));
            setAppliedTargetId(targetTaskId);
        }
    }

    const filteredTasks = useMemo(() => {
        return household?.tasks?.filter((task: any) => {
            const matchesTab = deriveTab(task) === activeTab;
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        }).sort((a: any, b: any) => {
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            return dateA - dateB;
        }) || [];
    }, [household?.tasks, activeTab, searchQuery]);

    const formatRelativeDate = useCallback((dateString: string) => {
        if (!dateString) return 'Today';
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return date.toLocaleDateString();
    }, []);

    const getMemberStats = useCallback((memberId: string) => {
        if (!household) return { taskCount: 0, points: 0 };
        const memberTasks = household.tasks.filter((t: any) => t.assignee?.id === memberId);
        const points = memberTasks
            .filter((t: any) => t.status?.toLowerCase() === 'completed')
            .reduce((sum: number, t: any) => sum + (t.points || 0), 0);
        return { taskCount: memberTasks.length, points };
    }, [household]);

    return useMemo(() => ({
        activeTab, setActiveTab,
        searchQuery, setSearchQuery,
        filteredTasks,
        formatRelativeDate,
        getMemberStats
    }), [activeTab, setActiveTab, searchQuery, setSearchQuery, filteredTasks,
        formatRelativeDate, getMemberStats]);
};
