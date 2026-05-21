import { useState, useEffect, useMemo, useCallback } from 'react';
import { statsApi } from '../../../api/stats.api';
import { householdApi } from '../../../api/household.api';
import { taskApi } from '../../../api/task.api';
import { useAppSelector } from '../../../store/hooks';
import type { Household } from '../../../types/household';
import type { SelectedEntity, AggregatedStats } from '../StatsScreen.types';

export const useStats = () => {
    const { user: currentUser } = useAppSelector(state => state.auth);
    const [households, setHouseholds] = useState<Household[]>([]);
    const [selectedHousehold, setSelectedHousehold] = useState<string>('');
    const [activeHouseholdDetail, setActiveHouseholdDetail] = useState<Household | null>(null);
    const [stats, setStats] = useState<AggregatedStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<SelectedEntity | null>(null);

    const loadStats = useCallback(async (isBackground = false) => {
        if (!selectedHousehold) return;
        if (!isBackground) setLoading(true);

        try {
            const [statsData, householdData] = await Promise.all([
                statsApi.getFairnessStats(selectedHousehold),
                householdApi.getHouseholdById(selectedHousehold)
            ]);
            setStats(statsData);
            setActiveHouseholdDetail(householdData);
        } catch (err) {
            console.error('Failed to load stats', err);
        } finally {
            setLoading(false);
        }
    }, [selectedHousehold]);

    useEffect(() => {
        const init = async () => {
            try {
                const data = await householdApi.getMyHouseholds();
                setHouseholds(data);
                if (data.length > 0) {
                    setSelectedHousehold(data[0].id);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                console.error('Failed to load initial data', err);
                setLoading(false);
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (selectedHousehold) {
            loadStats();
        }
    }, [selectedHousehold, loadStats]);

    const activeHousehold = activeHouseholdDetail;

    const filteredTasks = useMemo(() => {
        if (!selectedEntity || !selectedStatus || !stats?.tasks) return [];
        return stats.tasks.filter((t: any) => {
            const statusMatch = t.status === selectedStatus;
            let entityMatch = false;
            if (selectedEntity.type === 'MEMBER') {
                entityMatch = t.assignee?.id === selectedEntity.id || (!t.assignee && selectedEntity.id === 'Unassigned');
            } else {
                entityMatch = (t.taskType?.name || 'General') === selectedEntity.name;
            }
            return statusMatch && entityMatch;
        });
    }, [selectedEntity, selectedStatus, stats]);

    const handleTakeTask = async (taskId: string) => {
        if (!currentUser || !stats) return;
        
        // Optimistic UI Update
        const task = stats.tasks.find((t: any) => t.id === taskId);
        const isOverdue = task?.dueDate && new Date(task.dueDate) < new Date();
        const nextStatus = isOverdue ? 'overdue' : 'in-progress';

        const updatedTasks = stats.tasks.map((t: any) => 
            t.id === taskId ? { ...t, assignee: currentUser, status: nextStatus } : t
        );
        const newStats = { ...stats, tasks: updatedTasks };

        if (newStats.byMember['Unassigned']) {
            const unassigned = { ...newStats.byMember['Unassigned'] };
            unassigned.totalTasks--;
            const oldStatus = task?.status || 'pending';
            unassigned.statusCounts[oldStatus] = (unassigned.statusCounts[oldStatus] || 1) - 1;
            newStats.byMember['Unassigned'] = unassigned;
        }

        const userStats = { ...(newStats.byMember[currentUser.id] || { points: 0, totalTasks: 0, statusCounts: {} }) };
        userStats.totalTasks++;
        userStats.statusCounts[nextStatus] = (userStats.statusCounts[nextStatus] || 0) + 1;
        newStats.byMember[currentUser.id] = userStats;

        if (selectedEntity?.id === 'Unassigned') {
            setSelectedEntity({ ...selectedEntity, stats: newStats.byMember['Unassigned'] });
        }

        setStats(newStats);

        try {
            await taskApi.updateTask(taskId, { assignee: currentUser.id });
            await loadStats(true); 
        } catch (err) {
            console.error('Failed to take task', err);
            await loadStats(); 
        }
    };

    const statusData = useMemo(() => {
        if (!stats) return [];
        return [
            { name: 'Completed', value: stats.statusCounts.completed || 0 },
            { name: 'In Progress', value: stats.statusCounts['in-progress'] || 0 },
            { name: 'Pending', value: stats.statusCounts.pending || 0 },
            { name: 'Overdue', value: stats.statusCounts.overdue || 0 }
        ].filter(d => d.value > 0);
    }, [stats]);

    const memberDistributionData = useMemo(() => {
        if (!stats) return [];
        return Object.entries(stats.byMember).map(([id, s]: [string, any]) => {
            const user = activeHousehold?.members?.find(u => u.id === id);
            const name = user?.username || (id === 'Unassigned' ? 'Unassigned' : `Unknown (${id.slice(0, 4)})`);
            return { id, name, value: s.totalTasks };
        });
    }, [stats, activeHousehold]);

    const getModalChartData = () => {
        if (!selectedEntity || !stats) return { statusData: [], distributionData: [] };
        
        const entityTasks = stats.tasks?.filter((t: any) => {
            if (selectedEntity.type === 'MEMBER') {
                return t.assignee?.id === selectedEntity.id || (!t.assignee && selectedEntity.id === 'Unassigned');
            }
            return (t.taskType?.name || 'General') === selectedEntity.name;
        }) || [];

        const statusCounts = entityTasks.reduce((acc: any, t: any) => {
            acc[t.status] = (acc[t.status] || 0) + 1;
            return acc;
        }, {});

        const mStatusData = [
            { name: 'Completed', value: statusCounts.completed || 0 },
            { name: 'In Progress', value: statusCounts['in-progress'] || 0 },
            { name: 'Pending', value: statusCounts.pending || 0 },
            { name: 'Overdue', value: statusCounts.overdue || 0 }
        ].filter(d => d.value > 0);

        let mDistributionData: any[] = [];
        if (selectedEntity.type === 'TASK_TYPE') {
            const memberCounts = entityTasks.reduce((acc: any, t: any) => {
                const name = t.assignee?.username || 'Unassigned';
                const id = t.assignee?.id || 'Unassigned';
                if (!acc[id]) acc[id] = { name, value: 0 };
                acc[id].value++;
                return acc;
            }, {});
            mDistributionData = Object.values(memberCounts);
        } else if (selectedEntity.type === 'MEMBER') {
            const typeCounts = entityTasks.reduce((acc: any, t: any) => {
                const typeName = t.taskType?.name || 'General';
                acc[typeName] = (acc[typeName] || 0) + 1;
                return acc;
            }, {});
            mDistributionData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));
        }

        return { statusData: mStatusData, distributionData: mDistributionData };
    };

    return useMemo(() => ({
        households,
        selectedHousehold,
        setSelectedHousehold,
        stats,
        loading,
        selectedStatus,
        setSelectedStatus,
        selectedEntity,
        setSelectedEntity,
        activeHousehold,
        filteredTasks,
        handleTakeTask,
        statusData,
        memberDistributionData,
        getModalChartData
    }), [households, selectedHousehold, setSelectedHousehold, stats, loading, selectedStatus,
        setSelectedStatus, selectedEntity, setSelectedEntity, activeHousehold, filteredTasks,
        handleTakeTask, statusData, memberDistributionData, getModalChartData]);
};
