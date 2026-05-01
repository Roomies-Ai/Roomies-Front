import { motion } from 'framer-motion';
import { Check, ListTodo, Trash2 } from 'lucide-react';
import type { TaskItemProps } from './Step4.types';
import PointsControl from './PointsControl';

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    index,
    onToggle,
    onUpdate,
    onRemove 
}) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-5 rounded-[2rem] border-2 transition-all duration-300 relative ${
                task.approved 
                    ? 'bg-white border-emerald-100 shadow-premium-sm' 
                    : 'bg-gray-50 border-transparent opacity-60'
            }`}
        >
            {/* Control in upper-left corner */}
            <div className="absolute top-4 left-4 z-10">
                {task.isCustom ? (
                    <button 
                        onClick={() => onRemove(index)}
                        className="w-7 h-7 rounded-lg bg-red-50 text-red-500 border-2 border-red-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
                        title="Delete Task"
                    >
                        <Trash2 size={14} />
                    </button>
                ) : (
                    <button 
                        onClick={() => onToggle(index)}
                        className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                            task.approved 
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]' 
                                : 'bg-transparent border-gray-200'
                        }`}
                    >
                        {task.approved && <Check size={18} strokeWidth={4} />}
                    </button>
                )}
            </div>

            <div className="pl-10 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg shrink-0 ${task.approved ? 'bg-accent/10 text-accent' : 'bg-gray-200 text-gray-400'}`}>
                        <ListTodo size={14} />
                    </div>
                    <input 
                        value={task.title}
                        onChange={(e) => onUpdate(index, { title: e.target.value })}
                        placeholder="Task Title"
                        className="bg-transparent border-none p-0 focus:ring-0 font-bold text-charcoal text-base w-full outline-none placeholder:text-gray-300"
                    />
                </div>
                <textarea 
                    value={task.description}
                    onChange={(e) => onUpdate(index, { description: e.target.value })}
                    placeholder="Task Description"
                    className="bg-transparent border-none p-0 focus:ring-0 text-xs text-medium-gray w-full resize-none h-12 outline-none placeholder:text-gray-300 leading-relaxed"
                />
                
                <div className="flex items-center justify-between mt-4">
                    <PointsControl 
                        points={task.points} 
                        onChange={(points) => onUpdate(index, { points })} 
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default TaskItem;
