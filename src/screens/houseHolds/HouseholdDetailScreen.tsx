import { AnimatePresence, motion } from "framer-motion";
import { CheckSquare, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useHouseholdDetail } from "./hooks/useHouseholdDetail";

// Sub-components
import AddTaskModal from "../tasks/components/AddTaskModal";
import AssignmentModal from "./components/AssignmentModal";
import FairnessBalance from "./components/FairnessBalance";
import HouseholdInfo from "./components/HouseholdInfo";
import LeaveHouseholdModal from "./components/LeaveHouseholdModal";
import PointsModal from "./components/PointsModal";
import TaskCard from "./components/TaskCard";
import TaskFilters from "./components/TaskFilters";

const HouseholdDetailScreen = () => {
  const {
    navigate,
    currentUser,
    household,
    loading,
    error,
    targetTaskId,
    activeTab,
    setActiveTab,
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

  const [highlightedTaskId, setHighlightedTaskId] = useState<string | null>(
    null,
  );
  const [scrolledForTaskId, setScrolledForTaskId] = useState<string | null>(
    null,
  );

  // Once the task the user arrived for (e.g. via search) is present in the
  // visible list, mark it to be scrolled to and highlighted. Guarded so it
  // only fires once per target id.
  const targetTaskIsVisible =
    !!targetTaskId &&
    targetTaskId !== scrolledForTaskId &&
    filteredTasks.some((t: any) => t.id === targetTaskId);
  if (targetTaskIsVisible) {
    setScrolledForTaskId(targetTaskId);
    setHighlightedTaskId(targetTaskId);
  }

  // Pure DOM side effect: scroll to the highlighted task and fade it out after a beat.
  useEffect(() => {
    if (!highlightedTaskId) return;
    document
      .getElementById(`task-${highlightedTaskId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });

    const timeout = setTimeout(() => setHighlightedTaskId(null), 2500);
    return () => clearTimeout(timeout);
  }, [highlightedTaskId]);

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
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-500 mb-6">{error || "Household not found"}</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-[#3B95EA] text-white px-6 py-2 rounded-xl font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col pb-24">
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
            open: household.tasks.filter(
              (t: any) => t.status?.toLowerCase() === "pending",
            ).length,
            overdue: household.tasks.filter(
              (t: any) => t.status?.toLowerCase() === "overdue",
            ).length,
            inProgress: household.tasks.filter(
              (t: any) => t.status?.toLowerCase() === "in-progress",
            ).length,
            done: household.tasks.filter(
              (t: any) => t.status?.toLowerCase() === "completed",
            ).length,
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
                onAssignClick={(tid) => {
                  setAssigningTaskId(tid);
                  setSuggestion(null);
                }}
                onPointsClick={(tid, pts) => {
                  setEditingPointsTaskId(tid);
                  setPointsValue(pts);
                }}
                onEdit={(t) => {
                  setTaskToEdit(t);
                  setIsAddTaskModalOpen(true);
                }}
                formatRelativeDate={formatRelativeDate}
                idx={idx}
                isHighlighted={task.id === highlightedTaskId}
              />
            ))}
          </AnimatePresence>

          {filteredTasks.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <CheckSquare size={32} />
              </div>
              <p className="text-slate-400 font-bold tracking-tight">
                No {activeTab.toLowerCase()} tasks found
              </p>
            </div>
          )}
        </div>
      </main>

      <AssignmentModal
        isOpen={!!assigningTaskId}
        onClose={() => {
          setAssigningTaskId(null);
          setSuggestion(null);
        }}
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
        taskTitle={
          household.tasks.find((t: any) => t.id === editingPointsTaskId)
            ?.title || ""
        }
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
        onClose={() => {
          setIsAddTaskModalOpen(false);
          setTaskToEdit(null);
        }}
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
