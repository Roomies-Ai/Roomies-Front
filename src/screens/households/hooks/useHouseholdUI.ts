import { useState, useMemo, useCallback } from 'react';

export const useHouseholdUI = (household: any) => {
    const [activeTab, setActiveTab] = useState<'OPEN' | 'IN_PROGRESS' | 'DONE'>('OPEN');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTasks = useMemo(() => {
        const filtered = household?.tasks?.filter((task: any) => {
            const status = task.status?.toLowerCase();
            const isCompleted = status === 'completed';
            const isAssigned = !!task.assignee;

            const matchesTab = 
                (activeTab === 'OPEN' && !isAssigned && !isCompleted) ||
                (activeTab === 'IN_PROGRESS' && isAssigned && !isCompleted) ||
                (activeTab === 'DONE' && isCompleted);
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        }) || [];

        return filtered.sort((a: any, b: any) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
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
