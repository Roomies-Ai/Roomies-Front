import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Coins, User as UserIcon, Settings2, Calendar } from 'lucide-react';
import TaskIcon from '../../households/components/ui/TaskIcon';
import MemberAvatar from '../../households/components/ui/MemberAvatar';

interface TaskItemProps {
    task: any;
    onToggle: () => void;
    onEdit: () => void;
    showComplete?: boolean;
}

const TaskItem = ({ task, onToggle, onEdit, showComplete = true }: TaskItemProps) => {
    const isCompleted = task.status?.toLowerCase() === 'completed';
    const isPending = task.status?.toLowerCase() === 'pending';
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
            <div className="flex items-start gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${isCompleted ? 'bg-slate-200 text-slate-400' : 'bg-primary/5 text-primary'}`}>
                    <TaskIcon title={task.taskType?.name || task.title} size={24} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h4 className={`font-black text-slate-900 truncate text-lg ${isCompleted ? 'line-through' : ''}`}>
                            {task.title}
                        </h4>
                        {isProgress && (
                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        )}
                    </div>
                    <p className={`text-sm font-medium text-slate-400 line-clamp-2 mb-3 ${isCompleted ? 'line-through' : ''}`}>
                        {task.description || 'No description provided'}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                    <div className="flex gap-2">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onEdit(); }}
                            className="shrink-0 w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center transition-all hover:text-primary hover:bg-primary/5"
                        >
                            <Settings2 size={20} />
                        </button>

                        {showComplete && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                                className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                                    isCompleted ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-200 hover:text-primary hover:bg-primary/5'
                                }`}
                            >
                                {isCompleted ? <CheckCircle2 size={24} strokeWidth={2.5} /> : <Circle size={24} strokeWidth={2.5} />}
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 text-yellow-600 bg-yellow-400/10 px-3 py-1.5 rounded-xl border border-yellow-200/20">
                        <Coins size={12} />
                        <span className="text-[10px] font-black">{task.points || 0} pts</span>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-slate-50">
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-nowrap pb-1">
                    {task.assignee ? (
                        <div className="flex items-center gap-2 bg-slate-50 pr-3 pl-1 py-1 rounded-xl shrink-0">
                            <MemberAvatar username={task.assignee.username} size="w-6 h-6" />
                            <span className="text-[10px] font-black text-slate-900">{task.assignee.username}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl text-slate-400 shrink-0">
                            <UserIcon size={12} />
                            <span className="text-[10px] font-black">Unassigned</span>
                        </div>
                    )}
                    
                    {task.taskType && (
                        <div className="bg-primary/5 px-3 py-1.5 rounded-xl shrink-0">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{task.taskType.name}</span>
                        </div>
                    )}

                    {task.dueDate && (
                        <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-xl text-blue-600 shrink-0">
                            <Calendar size={12} />
                            <span className="text-[10px] font-black">{new Date(task.dueDate).toLocaleDateString('he-IL')}</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default TaskItem;
