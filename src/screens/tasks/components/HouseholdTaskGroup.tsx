import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronDown, Loader2 } from 'lucide-react';
import TaskItem from './TaskItem';
import TaskSkeleton from './TasksSkeleton';
import type { HouseholdTasks, Task } from '../types/tasks.types';

interface HouseholdTaskGroupProps {
    household: HouseholdTasks;
    isExpanded: boolean;
    isLoading?: boolean;
    onToggleExpand: () => void;
    onUpdateTaskStatus: (taskId: string, currentStatus: string) => void;
    onEditTask: (task: Task) => void;
    showCompleteInItem: boolean;
}

const HouseholdTaskGroup = React.memo(({
    household,
    isExpanded,
    isLoading,
    onToggleExpand,
    onUpdateTaskStatus,
    onEditTask,
    showCompleteInItem
}: HouseholdTaskGroupProps) => {
    return (
        <div className="space-y-4">
            <button 
                onClick={onToggleExpand}
                className="flex items-center justify-between w-full group"
            >
                <div className="flex items-center gap-3 ml-1">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isExpanded ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                        <Home size={16} />
                    </div>
                    <h3 className="font-black text-slate-900 text-lg">{household.name}</h3>
                    <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded-lg font-black group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center min-w-[24px]">
                        {isLoading ? <Loader2 size={10} className="animate-spin" /> : (household.taskCount ?? household.tasks.length)}
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
                            {isLoading ? (
                                <>
                                    <TaskSkeleton />
                                    <TaskSkeleton />
                                </>
                            ) : (
                                household.tasks.map((task) => (
                                    <TaskItem 
                                        key={task.id} 
                                        task={task} 
                                        onToggle={() => onUpdateTaskStatus(task.id, task.status)}
                                        onEdit={() => onEditTask(task)}
                                        showComplete={showCompleteInItem}
                                    />
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

export default HouseholdTaskGroup;
