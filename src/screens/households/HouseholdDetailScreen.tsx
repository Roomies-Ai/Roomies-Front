import { Loader2, Plus, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHouseholdDetail } from './hooks/useHouseholdDetail';

// Sub-components
import HouseholdHeader from './components/HouseholdHeader';
import HouseholdInfo from './components/HouseholdInfo';
import FairnessBalance from './components/FairnessBalance';
import TaskFilters from './components/TaskFilters';
import TaskCard from './components/TaskCard';
import AssignmentModal from './components/AssignmentModal';
import PointsModal from './components/PointsModal';
import LeaveHouseholdModal from './components/LeaveHouseholdModal';
import AddTaskModal from '../tasks/components/AddTaskModal';

const HouseholdDetailScreen = () => {
    const {
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
        isLeaveModalOpen,
        setIsLeaveModalOpen,
        handleGetSuggestion,
        handleUpdatePoints,
        handleUpdateTaskStatus,
        handleAssignTask,
        handleLeaveHousehold,
        handleConfirmLeave,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        isAddTaskModalOpen,
        setIsAddTaskModalOpen,
        taskToEdit,
        setTaskToEdit,
        allHouseholds,
        refresh,
        formatRelativeDate,
        getMemberStats,
        filteredTasks,
    } = useHouseholdDetail();

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
                <Loader2 size={40} className="animate-spin text-[#3B95EA]" />
            </div>
        );
    }

    if (error || !household) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] p-6 text-center">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
                <p className="text-slate-500 mb-6">{error || 'Household not found'}</p>
                <button onClick={() => navigate('/home')} className="bg-[#3B95EA] text-white px-6 py-2 rounded-xl font-bold">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen flex flex-col pb-24">
            <HouseholdHeader 
                currentUser={currentUser} 
                onBack={() => navigate('/home')} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
            />

            <main className="px-6 py-6 overflow-x-hidden">
                <HouseholdInfo 
                    name={household.name} 
                    inviteCode={household.inviteCode} 
                    onLeave={handleLeaveHousehold}
                />

                <FairnessBalance 
                    members={household.members} 
                    currentUser={currentUser} 
                    getMemberStats={getMemberStats} 
                />

                <TaskFilters 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    counts={{
                        open: household.tasks.filter((t: any) => !t.assignee && t.status?.toLowerCase() !== 'completed').length,
                        inProgress: household.tasks.filter((t: any) => t.assignee && t.status?.toLowerCase() !== 'completed').length,
                        done: household.tasks.filter((t: any) => t.status?.toLowerCase() === 'completed').length,
                    }}
                />

                <div className="flex flex-col gap-5">
                    <AnimatePresence mode="popLayout">
                        {filteredTasks.map((task: any, idx: number) => (
                            <TaskCard 
                                key={task.id} 
                                task={task} 
                                currentUser={currentUser} 
                                onUpdateStatus={handleUpdateTaskStatus} 
                                onAssignClick={(tid) => { setAssigningTaskId(tid); setSuggestion(null); }}
                                onPointsClick={(tid, pts) => { setEditingPointsTaskId(tid); setPointsValue(pts); }}
                                onEdit={(t) => { setTaskToEdit(t); setIsAddTaskModalOpen(true); }}
                                formatRelativeDate={formatRelativeDate}
                                idx={idx}
                            />
                        ))}
                    </AnimatePresence>

                    {filteredTasks.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <CheckSquare size={32} />
                            </div>
                            <p className="text-slate-400 font-bold tracking-tight">No {activeTab.toLowerCase()} tasks found</p>
                        </div>
                    )}
                </div>
            </main>

            <AssignmentModal 
                isOpen={!!assigningTaskId} 
                onClose={() => { setAssigningTaskId(null); setSuggestion(null); }} 
                household={household} 
                assigningTaskId={assigningTaskId} 
                currentUser={currentUser} 
                handleAssignTask={handleAssignTask} 
                handleGetSuggestion={handleGetSuggestion} 
                isSuggesting={isSuggesting} 
                suggestion={suggestion} 
            />

            <PointsModal 
                isOpen={!!editingPointsTaskId} 
                onClose={() => setEditingPointsTaskId(null)} 
                taskTitle={household.tasks.find((t: any) => t.id === editingPointsTaskId)?.title || ''} 
                pointsValue={pointsValue} 
                setPointsValue={setPointsValue} 
                onSave={() => handleUpdatePoints(editingPointsTaskId!, pointsValue)} 
            />

            <LeaveHouseholdModal 
                isOpen={isLeaveModalOpen}
                onClose={() => setIsLeaveModalOpen(false)}
                onConfirm={handleConfirmLeave}
                householdName={household.name}
            />

            <AddTaskModal 
                isOpen={isAddTaskModalOpen}
                onClose={() => { setIsAddTaskModalOpen(false); setTaskToEdit(null); }}
                households={allHouseholds}
                onAdd={handleAddTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onRefresh={refresh}
                taskToEdit={taskToEdit}
                lockedHouseholdId={household.id}
            />

            <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAddTaskModalOpen(true)}
                className="fixed bottom-32 right-6 w-16 h-16 bg-[#3B95EA] text-white rounded-full shadow-lg shadow-[#3B95EA]/40 flex items-center justify-center z-50 border-4 border-white"
            >
                <Plus size={32} strokeWidth={3} />
            </motion.button>
        </div>
    );
};

export default HouseholdDetailScreen;
