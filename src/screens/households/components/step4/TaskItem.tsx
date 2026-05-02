import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ListTodo, Trash2, Calendar, ChevronDown } from 'lucide-react';
import type { TaskItemProps } from './Step4.types';
import PointsControl from './PointsControl';

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    index,
    onToggle,
    onUpdate,
    onRemove 
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

            <div className="pl-9 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg shrink-0 ${task.approved ? 'bg-accent/10 text-accent' : 'bg-gray-200 text-gray-400'}`}>
                        <ListTodo size={14} />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <input 
                            value={task.title}
                            onChange={(e) => onUpdate(index, { title: e.target.value })}
                            placeholder="Task Title"
                            className="bg-transparent border-none p-0 focus:ring-0 font-bold text-charcoal text-base w-full outline-none placeholder:text-gray-300"
                        />
                    </div>
                </div>
                <textarea 
                    value={task.description}
                    onChange={(e) => onUpdate(index, { description: e.target.value })}
                    placeholder="Task Description"
                    className="bg-transparent border-none p-0 focus:ring-0 text-xs text-medium-gray w-full resize-none h-12 outline-none placeholder:text-gray-300 leading-relaxed"
                />
                <div className="flex flex-col gap-3 mt-3">
                    {/* Category Selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category:</span>
                        <div className="relative">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer transition-all hover:bg-slate-100 hover:border-slate-200 ${task.approved ? 'text-primary' : 'text-gray-400'}`}
                            >
                                {task.taskType || 'General'}
                                <ChevronDown size={12} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <>
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="fixed inset-0 z-[100]"
                                        />
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            className="absolute left-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-premium border border-slate-50 overflow-hidden z-[101]"
                                        >
                                            <div className="p-2 flex flex-col">
                                                {['General', 'Cleaning', 'Cooking', 'Groceries', 'Maintenance', 'Trash/Recycling', 'Laundry'].map(type => (
                                                    <button 
                                                        key={type}
                                                        onClick={() => {
                                                            onUpdate(index, { taskType: type });
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                            task.taskType === type 
                                                            ? 'bg-primary/10 text-primary' 
                                                            : 'text-slate-600 hover:bg-slate-50'
                                                        }`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1.5 rounded-xl border border-slate-100 shrink-0 relative cursor-pointer group">
                            <Calendar size={14} className="text-slate-400" />
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
                                {task.dueDate 
                                    ? new Date(task.dueDate).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                    : new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                }
                            </span>
                            <input 
                                type="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                value={task.dueDate || new Date().toISOString().split('T')[0]}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        onUpdate(index, { dueDate: e.target.value });
                                    }
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <PointsControl 
                            points={task.points} 
                            onChange={(points) => onUpdate(index, { points })} 
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskItem;
