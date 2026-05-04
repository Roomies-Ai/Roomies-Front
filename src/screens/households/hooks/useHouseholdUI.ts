import { useState, useMemo } from 'react';

export const useHouseholdUI = (household: any) => {
    const [activeTab, setActiveTab] = useState<'OPEN' | 'IN_PROGRESS' | 'DONE'>('OPEN');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTasks = useMemo(() => {
        return household?.tasks?.filter((task: any) => {
            const status = task.status?.toLowerCase();
            const matchesTab = 
                (activeTab === 'OPEN' && status === 'pending') ||
                (activeTab === 'IN_PROGRESS' && status === 'in-progress') ||
                (activeTab === 'DONE' && status === 'completed');
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        }) || [];
    }, [household?.tasks, activeTab, searchQuery]);

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
        if (!household) return { taskCount: 0, points: 0 };
        const memberTasks = household.tasks.filter((t: any) => t.assignee?.id === memberId);
        const points = memberTasks
            .filter((t: any) => t.status?.toLowerCase() === 'completed')
            .reduce((sum: number, t: any) => sum + (t.points || 0), 0);
        return { taskCount: memberTasks.length, points };
    };

    return {
        activeTab, setActiveTab,
        searchQuery, setSearchQuery,
        filteredTasks,
        formatRelativeDate,
        getMemberStats
    };
};
