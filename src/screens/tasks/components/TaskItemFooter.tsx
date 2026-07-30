import { User as UserIcon, Calendar, RefreshCw } from 'lucide-react';
import MemberAvatar from '../../houseHolds/components/ui/MemberAvatar';
import type { TaskItemFooterProps } from './TaskItem.types';

const TaskItemFooter = ({ task, onAssignClick }: TaskItemFooterProps) => {
    return (
        <div className="pt-3 border-t border-slate-50">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-nowrap pb-1">
                {task.assignee ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); onAssignClick?.(); }}
                        className="flex items-center gap-2 bg-slate-50 pr-3 pl-1 py-1 rounded-xl shrink-0 hover:bg-slate-100 transition-colors"
                    >
                        <MemberAvatar username={task.assignee.username} profilePicture={task.assignee.profilePicture} size="w-6 h-6" />
                        <span className="text-[10px] font-black text-slate-900">{task.assignee.username}</span>
                    </button>
                ) : (
                    <button
                        onClick={(e) => { e.stopPropagation(); onAssignClick?.(); }}
                        className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl text-slate-400 shrink-0 hover:bg-slate-100 transition-colors"
                    >
                        <UserIcon size={12} />
                        <span className="text-[10px] font-black">Unassigned</span>
                    </button>
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

                {task.recurrenceRule && !task.recurrenceParentId && (
                    <div className="flex items-center gap-1.5 bg-violet-50 px-3 py-1.5 rounded-xl text-violet-600 shrink-0">
                        <RefreshCw size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {task.recurrenceRule.frequency}
                        </span>
                    </div>
                )}

                {task.recurrenceParentId && (
                    <div className="flex items-center gap-1.5 bg-violet-50/70 px-3 py-1.5 rounded-xl text-violet-400 shrink-0">
                        <RefreshCw size={12} />
                        <span className="text-[10px] font-black">instance</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskItemFooter;
