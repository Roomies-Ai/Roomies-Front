import { CheckCircle2, Circle, Coins, Settings2, ChevronDown, ChevronUp } from 'lucide-react';
import TaskIcon from '../../houseHolds/components/ui/TaskIcon';
import type { TaskItemHeaderProps } from './TaskItem.types';

const TaskItemHeader = ({ task, isCompleted, isProgress, isOverdue, onEdit, onToggle, showComplete, onToggleExpand, isExpanded }: TaskItemHeaderProps) => {
    return (
        <div className="flex items-start gap-4">
            <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${isCompleted ? 'bg-slate-200 text-slate-400' : isOverdue ? 'bg-red-50 text-red-500' : 'bg-primary/5 text-primary'}`}>
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

                {onToggleExpand && (
                    <button
                        onClick={onToggleExpand}
                        className="flex items-center gap-1 px-3 py-1.5 bg-violet-50 text-violet-500 rounded-xl transition-all hover:bg-violet-100"
                    >
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        <span className="text-[10px] font-black">{isExpanded ? 'Hide' : 'Show'}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskItemHeader;
