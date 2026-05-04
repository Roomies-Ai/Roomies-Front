import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { statsApi } from '../../api/stats.api';
import { householdApi } from '../../api/household.api';
import { taskApi } from '../../api/task.api';
import { useAppSelector } from '../../store/hooks';
import type { Household } from '../../types/household';
import type { SelectedEntity, AggregatedStats } from './StatsScreen.types';

// Components
import StatsSummaryCards from './components/StatsSummaryCards';
import StatsVisualInsights from './components/StatsVisualInsights';
import MemberPerformance from './components/MemberPerformance';
import TaskCategoryBreakdown from './components/TaskCategoryBreakdown';
import StatsDetailModal from './components/StatsDetailModal';
import UnassignedTasksSection from './components/UnassignedTasksSection';

const StatsScreen = () => {
    const { user: currentUser } = useAppSelector(state => state.auth);
    const [households, setHouseholds] = useState<Household[]>([]);
    const [selectedHousehold, setSelectedHousehold] = useState<string>('');
    const [stats, setStats] = useState<AggregatedStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<SelectedEntity | null>(null);

    const loadStats = async (isBackground = false) => {
        if (!selectedHousehold) return;
        if (!isBackground) setLoading(true);
        else setIsRefreshing(true);

        try {
            const data = await statsApi.getFairnessStats(selectedHousehold);
            setStats(data);
        } catch (err) {
            console.error('Failed to load stats', err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        const loadHouseholds = async () => {
            try {
                const data = await householdApi.getMyHouseholds();
                setHouseholds(data);
                if (data.length > 0) setSelectedHousehold(data[0].id);
            } catch (err) {
                console.error('Failed to load households', err);
            }
        };
        loadHouseholds();
    }, []);

    useEffect(() => {
        loadStats();
    }, [selectedHousehold]);

    const activeHousehold = households.find(h => h.id === selectedHousehold);

    const filteredTasks = (selectedEntity && selectedStatus ? stats?.tasks?.filter((t: any) => {
        const statusMatch = t.status === selectedStatus;
        let entityMatch = false;
        if (selectedEntity.type === 'MEMBER') {
            entityMatch = t.assignee?.id === selectedEntity.id || (!t.assignee && selectedEntity.id === 'Unassigned');
        } else {
            entityMatch = (t.taskType?.name || 'General') === selectedEntity.name;
        }
        return statusMatch && entityMatch;
    }) : []) || [];

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

    const statusData = stats ? [
        { name: 'Completed', value: stats.statusCounts.completed || 0 },
        { name: 'In Progress', value: stats.statusCounts['in-progress'] || 0 },
        { name: 'Pending', value: stats.statusCounts.pending || 0 },
        { name: 'Overdue', value: stats.statusCounts.overdue || 0 }
    ].filter(d => d.value > 0) : [];

    const memberDistributionData = stats ? Object.entries(stats.byMember).map(([id, s]: [string, any]) => {
        const user = activeHousehold?.members?.find(u => u.id === id);
        const name = user?.username || (id === 'Unassigned' ? 'Unassigned' : `Unknown (${id.slice(0, 4)})`);
        return { id, name, value: s.totalTasks };
    }) : [];

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

    return (
        <div className="flex flex-col bg-[#F8FAFC] pb-24 px-6">
            <div className="py-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Analytics</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Household Insights</p>
                </div>
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-primary">
                    <BarChart3 size={24} strokeWidth={2.5} />
                </div>
            </div>

            {households.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
                        {households.map(h => (
                            <button
                                key={h.id}
                                onClick={() => setSelectedHousehold(h.id)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
                                    selectedHousehold === h.id 
                                    ? 'bg-primary border-primary text-white shadow-lg shadow-blue-200' 
                                    : 'bg-white border-slate-100 text-slate-400 hover:border-blue-100'
                                }`}
                            >
                                {h.name}
                            </button>
                        ))}
                    </div>
                )}
            <div className="flex flex-col gap-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Calculating Stats...</p>
                    </div>
                ) : stats ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                        <StatsSummaryCards stats={stats} />
                        
                        <StatsVisualInsights 
                            statusData={statusData} 
                            memberDistributionData={memberDistributionData} 
                        />

                        {stats.byMember['Unassigned'] && (
                            <UnassignedTasksSection 
                                unassignedStats={stats.byMember['Unassigned']}
                                onSelectEntity={(entity) => {
                                    setSelectedEntity(entity);
                                    setSelectedStatus(null);
                                }}
                            />
                        )}

                        <MemberPerformance 
                            activeHousehold={activeHousehold} 
                            stats={stats} 
                            onSelectEntity={(entity) => {
                                setSelectedEntity(entity);
                                setSelectedStatus(null);
                            }}
                        />

                        <TaskCategoryBreakdown 
                            stats={stats} 
                            onSelectEntity={(entity) => {
                                setSelectedEntity(entity);
                                setSelectedStatus(null);
                            }}
                        />
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center px-10">
                        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
                            <BarChart3 size={40} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">No Data Yet</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Complete some tasks to see your household metrics!</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedEntity && (
                    <StatsDetailModal 
                        selectedEntity={selectedEntity}
                        onClose={() => {
                            setSelectedEntity(null);
                            setSelectedStatus(null);
                        }}
                        modalCharts={getModalChartData()}
                        selectedStatus={selectedStatus}
                        onSelectStatus={setSelectedStatus}
                        filteredTasks={filteredTasks}
                        onTakeTask={handleTakeTask}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default StatsScreen;
