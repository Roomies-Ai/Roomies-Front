import { useState, useMemo, useCallback } from 'react';

const TAB_BY_STATUS: Record<string, 'OPEN' | 'IN_PROGRESS' | 'DONE'> = {
    'pending': 'OPEN',
    'in-progress': 'IN_PROGRESS',
    'completed': 'DONE',
};

export const useHouseholdUI = (household: any, targetTaskId?: string | null) => {
    const [activeTab, setActiveTab] = useState<'OPEN' | 'IN_PROGRESS' | 'DONE'>('OPEN');
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedTargetId, setAppliedTargetId] = useState<string | null>(null);

    if (household && targetTaskId && targetTaskId !== appliedTargetId) {
        const targetTask = household.tasks?.find((t: any) => t.id === targetTaskId);
        const tab = targetTask && TAB_BY_STATUS[targetTask.status?.toLowerCase()];
        if (tab) setActiveTab(tab);
        setAppliedTargetId(targetTaskId);
    }

    const filteredTasks = useMemo(() => {
        return household?.tasks?.filter((task: any) => {
            const status = task.status?.toLowerCase();
            const matchesTab = 
                (activeTab === 'OPEN' && status === 'pending') ||
                (activeTab === 'IN_PROGRESS' && status === 'in-progress') ||
                (activeTab === 'DONE' && status === 'completed');
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
