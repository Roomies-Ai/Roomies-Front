import React from 'react';
import { motion } from 'framer-motion';
import type { TaskItemProps } from './TaskItem.types';
import TaskItemHeader from './TaskItemHeader';
import TaskItemFooter from './TaskItemFooter';

const TaskItem = React.memo(({ task, onToggle, onEdit, showComplete = true }: TaskItemProps) => {
    const isCompleted = task.status?.toLowerCase() === 'completed';
    const isProgress = task.status?.toLowerCase() === 'in-progress';
    const isOverdue = task.dueDate && new Date(task.dueDate).getTime() < new Date().setHours(0,0,0,0) && !isCompleted;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onEdit}
            className={`flex flex-col gap-3 p-5 rounded-[2rem] border-2 transition-[transform,opacity,border-color,background-color] cursor-pointer ${
                isCompleted 
                ? 'bg-slate-50 border-transparent opacity-60' 
                : isOverdue
                ? 'bg-red-50 border-red-200 shadow-sm'
                : 'bg-white border-slate-100 shadow-premium hover:border-primary/20 hover:shadow-xl hover:-translate-y-0.5'
            }`}
        >
            <TaskItemHeader 
                task={task} 
                isCompleted={isCompleted} 
                isProgress={isProgress} 
                isOverdue={isOverdue}
                onEdit={onEdit} 
                onToggle={onToggle} 
                showComplete={showComplete} 
            />
            
            <TaskItemFooter task={task} isOverdue={isOverdue} />
        </motion.div>
    );
});

export default TaskItem;

