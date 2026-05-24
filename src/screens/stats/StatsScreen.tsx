import { motion, AnimatePresence } from 'framer-motion';

// Components
import StatsHeader from './components/StatsHeader';
import StatsHouseholdSelector from './components/StatsHouseholdSelector';
import StatsLoadingState from './components/StatsLoadingState';
import StatsEmptyState from './components/StatsEmptyState';
import StatsSummaryCards from './components/StatsSummaryCards';
import StatsVisualInsights from './components/StatsVisualInsights';
import MemberPerformance from './components/MemberPerformance';
import TaskCategoryBreakdown from './components/TaskCategoryBreakdown';
import StatsDetailModal from './components/StatsDetailModal';
import UnassignedTasksSection from './components/UnassignedTasksSection';

// Hooks
import { useStats } from './hooks/useStats';

const StatsScreen = () => {
    const {
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
    } = useStats();

    return (
        <div className="flex flex-col bg-[#F8FAFC] pb-24">
            <div className="w-full max-w-4xl mx-auto px-6">
            <StatsHeader />

            <StatsHouseholdSelector 
                households={households}
                selectedHousehold={selectedHousehold}
                setSelectedHousehold={setSelectedHousehold}
            />

            <div className="flex flex-col gap-6">
                {loading ? (
                    <StatsLoadingState />
                ) : stats ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="flex flex-col gap-6"
                    >
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
                    <StatsEmptyState />
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
        </div>
    );
};

export default StatsScreen;
