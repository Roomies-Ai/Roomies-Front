import React from 'react';
import { motion } from 'framer-motion';
import type { TaskItemProps } from './TaskItem.types';
import TaskItemHeader from './TaskItemHeader';
import TaskItemFooter from './TaskItemFooter';

const TaskItem = React.memo(({ task, onToggle, onEdit, showComplete = true }: TaskItemProps) => {
    const isCompleted = task.status?.toLowerCase() === 'completed';
    const isProgress = task.status?.toLowerCase() === 'in-progress';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onEdit}
            className={`flex flex-col gap-3 p-5 rounded-[2rem] border-2 transition-all cursor-pointer ${
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
            />
            
            <TaskItemFooter task={task} />
        </motion.div>
    );
});

export default TaskItem;

