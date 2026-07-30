import React from 'react';
import { motion } from 'framer-motion';
import type { TaskCardProps } from '../HouseholdDetail.types';
import TaskIcon from './ui/TaskIcon';
import MemberAvatar from './ui/MemberAvatar';
import PointsBadge from './ui/PointsBadge';
import { Calendar } from 'lucide-react';

const TaskCard = ({ task, currentUser, onUpdateStatus, onAssignClick, onPointsClick, onEdit, idx }: TaskCardProps) => {
    const isMyTask = String(task.assignee?.id) === String(currentUser?.id || currentUser?.userId);
    const isPending = task.status?.toLowerCase() === 'pending';
    const isCompleted = task.status?.toLowerCase() === 'completed';
    const isOverdue = task.dueDate && new Date(task.dueDate).getTime() < new Date().setHours(0,0,0,0) && !isCompleted;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onEdit?.(task)}
            className={`p-6 rounded-[2.5rem] shadow-sm border flex flex-col gap-6 cursor-pointer hover:shadow-md transition-[transform,opacity,box-shadow,border-color] group ${isOverdue ? 'bg-red-50 border-red-200' : 'bg-white border-slate-50 hover:border-primary/20'}`}
        >
            <div className="flex justify-between items-start">
                <div className="flex gap-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isOverdue ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#3B95EA]'}`}>
                        <TaskIcon title={task.title} size={24} />
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                        <h3 className="text-lg font-black text-slate-900 mb-1 truncate">{task.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 shrink-0">
                                {task.taskType?.name || 'General'}
                            </span>
                            <span className="text-slate-300 shrink-0">•</span>
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border shrink-0 ${isOverdue ? 'bg-red-50 border-red-200 text-red-500' : 'bg-blue-50 border-blue-100 text-[#3B95EA]'}`}>
                                <Calendar size={10} />
                                <span className="text-[10px] font-black uppercase tracking-wider">
                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString('he-IL') : 'No Due Date'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <button 
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onAssignClick(task.id);
                    }}
                    className="flex items-center gap-3 hover:bg-slate-50 p-2 -ml-2 rounded-2xl transition-colors"
                >
                    <MemberAvatar username={task.assignee?.username} />
                    <span className="text-sm font-bold text-slate-500">
                        {task.assignee ? `Assigned to ${isMyTask ? 'You' : task.assignee.username}` : 'Unassigned'}
                    </span>
                </button>
                
                {(task.assignee || isCompleted) && (
                    <div className="flex flex-col items-end gap-2">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                onUpdateStatus(task.id, task.status);
                            }}
                            className={`px-6 py-2.5 rounded-2xl font-black text-sm transition-all ${
                                isCompleted 
                                ? 'bg-slate-100 text-[#3B95EA] border border-[#3B95EA]/20' 
                                : 'bg-[#3B95EA] text-white shadow-lg shadow-[#3B95EA]/20'
                            }`}
                        >
                            {isCompleted ? 'Reopen' : 'Mark Done'}
                        </motion.button>
                        <PointsBadge 
                            points={task.points || 0} 
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                onPointsClick(task.id, task.points || 0);
                            }}
                            interactive={isPending}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default TaskCard;
