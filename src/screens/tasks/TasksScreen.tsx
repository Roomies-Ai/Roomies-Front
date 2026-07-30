import { TasksSkeletonGroup } from './components/TasksSkeleton';

// Components
import TasksHeader from './components/TasksHeader';
import TasksFilter from './components/TasksFilter';
import HouseholdTaskGroup from './components/HouseholdTaskGroup';
import EmptyTasksState from './components/EmptyTasksState';
import AddTaskFAB from './components/AddTaskFAB';
import AddTaskModal from './components/AddTaskModal';
import AssignmentModal from '../houseHolds/components/AssignmentModal';

// Hooks
import { useTasks } from './hooks/useTasks';
import { useTasksUI } from './hooks/useTasksUI';

const TasksScreen = () => {
    const {
        currentUser,
        filteredHouseholds,
        filter,
        setFilter,
        loading,
        loadingHouseholds,
        error,
        handleUpdateTaskStatus,
        handleUpdateTask,
        handleAddTask,
        handleDeleteTask,
        handleClearRecurrence,
        fetchHouseholdTasks,
        refresh,
        allHouseholds,
        assigningTaskId,
        assigningHousehold,
        isLoadingHousehold,
        openAssignModal,
        closeAssignModal,
        isSuggesting,
        suggestion,
        handleGetSuggestion,
        handleAssignTask
    } = useTasks();

    const {
        isAddModalOpen,
        setIsAddModalOpen,
        taskToEdit,
        openEditModal,
        handleCloseModal,
        expandedHouseholds,
        toggleHousehold
    } = useTasksUI();

    const handleToggle = (id: string) => {
        toggleHousehold(id);
        if (!expandedHouseholds[id]) {
            fetchHouseholdTasks(id);
        }
    };

    return (
        <div className="bg-[#F8FAFC] min-h-screen flex flex-col pt-0 pb-32">
            <main className="flex-1 px-8 py-6 w-full max-w-4xl mx-auto">
                <div className="flex flex-col gap-8 mb-10">
                    <TasksHeader 
                        title={filter === 'ME' ? 'My Tasks' : 'All Household Tasks'}
                        subtitle={filter === 'ME' ? 'Assigned to you' : 'Global overview'}
                    />
                    <TasksFilter filter={filter} setFilter={setFilter} />
                </div>

                {loading ? (
                    <TasksSkeletonGroup />
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 font-bold">{error}</p>
                    </div>
                ) : filteredHouseholds.length > 0 ? (
                    <div className="space-y-10">
                        {filteredHouseholds.map((household) => (
                            <HouseholdTaskGroup 
                                key={household.id}
                                household={household}
                                isExpanded={!!expandedHouseholds[household.id]}
                                isLoading={loadingHouseholds[household.id]}
                                onToggleExpand={() => handleToggle(household.id)}
                                onUpdateTaskStatus={handleUpdateTaskStatus}
                                onEditTask={openEditModal}
                                onAssignClick={openAssignModal}
                                showCompleteInItem={filter === 'ME'}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyTasksState />
                )}
            </main>

            <AddTaskFAB onClick={() => setIsAddModalOpen(true)} />

            <AssignmentModal
                isOpen={!!assigningTaskId}
                onClose={closeAssignModal}
                household={assigningHousehold || { members: [], tasks: [] }}
                assigningTaskId={assigningTaskId}
                currentUser={currentUser}
                handleAssignTask={handleAssignTask}
                handleGetSuggestion={handleGetSuggestion}
                isSuggesting={isSuggesting}
                suggestion={suggestion}
                isLoadingHousehold={isLoadingHousehold}
            />

            <AddTaskModal
                isOpen={isAddModalOpen} 
                onClose={handleCloseModal} 
                households={allHouseholds}
                onAdd={handleAddTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onClearRecurrence={handleClearRecurrence}
                onRefresh={refresh}
                taskToEdit={taskToEdit}
            />
        </div>
    );
};

export default TasksScreen;
