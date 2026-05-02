import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2, ClipboardCheck, Sparkles, Home, ChevronRight, ChevronDown, User, Users } from 'lucide-react';
import Header from '../../components/layout/Header';
import { useTasks } from './hooks/useTasks';
import TaskItem from './components/TaskItem';
import AddTaskModal from './components/AddTaskModal';

const TasksScreen = () => {
    const { 
        filteredHouseholds, 
        filter,
        setFilter,
        loading, 
        error, 
        handleUpdateTaskStatus, 
        handleUpdateTask,
        handleAddTask, 
        handleDeleteTask,
        refresh,
        allHouseholds 
    } = useTasks();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<any>(null);
    const [expandedHouseholds, setExpandedHouseholds] = useState<Record<string, boolean>>({});

    const openEditModal = (task: any) => {
        setTaskToEdit(task);
        setIsAddModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setTaskToEdit(null);
    };

    const toggleHousehold = (id: string) => {
        setExpandedHouseholds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="bg-[#F8FAFC] min-h-screen flex flex-col pt-24 pb-32">
            <Header showActions={false} />

            <main className="flex-1 px-8 py-6 w-full max-w-4xl mx-auto">
                <div className="flex flex-col gap-8 mb-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                {filter === 'ME' ? 'My Tasks' : 'All Household Tasks'}
                            </h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                {filter === 'ME' ? 'Assigned to you' : 'Global overview'}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary border border-slate-50">
                            <ClipboardCheck size={24} />
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] w-full sm:w-80">
                        <button 
                            onClick={() => setFilter('ME')}
                            className={`flex-1 py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 ${filter === 'ME' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-500'}`}
                        >
                            <User size={16} />
                            My Tasks
                        </button>
                        <button 
                            onClick={() => setFilter('ALL')}
                            className={`flex-1 py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 ${filter === 'ALL' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-500'}`}
                        >
                            <Users size={16} />
                            All Tasks
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-20">
                        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 font-bold">{error}</p>
                    </div>
                ) : filteredHouseholds.length > 0 ? (
                    <div className="space-y-10">
                        {filteredHouseholds.map((household) => {
                            const isExpanded = !!expandedHouseholds[household.id]; // Default to false
                            return (
                                <div key={household.id} className="space-y-4">
                                    <button 
                                        onClick={() => toggleHousehold(household.id)}
                                        className="flex items-center justify-between w-full group"
                                    >
                                        <div className="flex items-center gap-3 ml-1">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isExpanded ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                                                <Home size={16} />
                                            </div>
                                            <h3 className="font-black text-slate-900 text-lg">{household.name}</h3>
                                            <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded-lg font-black group-hover:bg-primary group-hover:text-white transition-colors">
                                                {household.tasks.length}
                                            </span>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isExpanded ? 'rotate-0' : '-rotate-90'} text-slate-300`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 gap-4 pb-2">
                                                    {household.tasks.map((task: any) => (
                                                        <TaskItem 
                                                            key={task.id} 
                                                            task={task} 
                                                            onToggle={() => handleUpdateTaskStatus(task.id, task.status)}
                                                            onEdit={() => openEditModal(task)}
                                                            showComplete={filter === 'ME'}
                                                        />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-premium flex items-center justify-center text-slate-200 mb-6 border border-slate-50">
                            <ClipboardCheck size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Clean Slate!</h3>
                        <p className="text-slate-400 font-medium max-w-[240px] mx-auto">
                            You don't have any tasks assigned to you right now.
                        </p>
                    </div>
                )}
            </main>

            {/* Floating Action Button */}
            <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddModalOpen(true)}
                className="fixed bottom-32 right-8 w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] shadow-2xl shadow-slate-900/20 flex items-center justify-center z-50 group overflow-hidden"
            >
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Plus size={32} strokeWidth={3} className="relative z-10" />
                <div className="absolute top-0 right-0 p-1">
                    <Sparkles size={12} className="text-white/40" />
                </div>
            </motion.button>

            <AddTaskModal 
                isOpen={isAddModalOpen} 
                onClose={handleCloseModal} 
                households={allHouseholds}
                onAdd={handleAddTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onRefresh={refresh}
                taskToEdit={taskToEdit}
            />
        </div>
    );
};

export default TasksScreen;
