import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { TaskItemProps } from './TaskItem.types';
import type { Task } from '../types/tasks.types';
import TaskItemHeader from './TaskItemHeader';
import TaskItemFooter from './TaskItemFooter';
import { taskApi } from '../../../api/task.api';

const TaskItem = React.memo(({ task, onToggle, onEdit, onAssignClick, showComplete = true }: TaskItemProps) => {
    const isCompleted = task.status?.toLowerCase() === 'completed';
    const isProgress = task.status?.toLowerCase() === 'in-progress';
    const isTemplate = !!task.recurrenceRule && !task.recurrenceParentId;

    const [isExpanded, setIsExpanded] = useState(false);
    const [instances, setInstances] = useState<Task[]>([]);
    const [loadingInstances, setLoadingInstances] = useState(false);
    const hasFetched = useRef(false);

    const handleToggleExpand = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isExpanded && !hasFetched.current) {
            hasFetched.current = true;
            setLoadingInstances(true);
            try {
                setInstances(await taskApi.getRecurrenceInstances(task.id));
            } finally {
                setLoadingInstances(false);
            }
        }
        setIsExpanded(p => !p);
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onEdit}
                className={`flex flex-col gap-3 p-5 rounded-[2rem] border-2 transition-[transform,opacity,border-color,background-color] cursor-pointer ${
                    isCompleted
                    ? 'bg-slate-50 border-transparent opacity-60'
                    : 'bg-white border-slate-100 shadow-premium hover:border-primary/20 hover:shadow-xl hover:-translate-y-0.5'
                }`}
            >
                <TaskItemHeader
                    task={task}
                    isCompleted={isCompleted}
                    isProgress={isProgress}
                    onEdit={onEdit}
                    onToggle={onToggle}
                    showComplete={showComplete}
                    onToggleExpand={isTemplate ? handleToggleExpand : undefined}
                    isExpanded={isExpanded}
                />

                <TaskItemFooter task={task} onAssignClick={onAssignClick} />
            </motion.div>

            {isTemplate && isExpanded && (
                <div className="ml-4 mt-1.5 flex flex-col gap-1.5">
                    {loadingInstances && (
                        <div className="text-xs text-slate-400 px-4 py-2 font-bold">Loading...</div>
                    )}
                    {instances.map(inst => (
                        <div key={inst.id} className="flex items-center justify-between px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">
                                {inst.dueDate ? new Date(inst.dueDate).toLocaleDateString('he-IL') : '—'}
                            </span>
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${
                                inst.status?.toLowerCase() === 'completed'
                                    ? 'bg-green-100 text-green-600'
                                    : inst.status?.toLowerCase() === 'in-progress'
                                    ? 'bg-blue-50 text-blue-500'
                                    : 'bg-slate-100 text-slate-400'
                            }`}>
                                {inst.status}
                            </span>
                        </div>
                    ))}
                    {!loadingInstances && instances.length === 0 && (
                        <div className="text-xs text-slate-400 px-4 py-2 font-bold">No upcoming instances</div>
                    )}
                </div>
            )}
        </div>
    );
});

export default TaskItem;

