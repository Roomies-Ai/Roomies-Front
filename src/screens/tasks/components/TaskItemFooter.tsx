import { User as UserIcon, Calendar } from 'lucide-react';
import MemberAvatar from '../../households/components/ui/MemberAvatar';
import type { TaskItemFooterProps } from './TaskItem.types';

const TaskItemFooter = ({ task, isOverdue }: TaskItemFooterProps) => {
    return (
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
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl shrink-0 border ${isOverdue ? 'bg-red-50 text-red-500 border-red-200' : 'bg-blue-50 text-blue-600 border-transparent'}`}>
                        <Calendar size={12} />
                        <span className="text-[10px] font-black">{new Date(task.dueDate).toLocaleDateString('he-IL')}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskItemFooter;
