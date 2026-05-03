import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart as PieIcon, ArrowUpRight, ChevronDown } from 'lucide-react';
import type { TaskCategoryBreakdownProps } from '../StatsScreen.types';

const TaskCategoryBreakdown = ({ stats, onSelectEntity }: TaskCategoryBreakdownProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-8">
            <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <PieIcon size={20} />
                    </div>
                    <h2 className="text-lg font-black text-slate-900">Task Categories</h2>
                </div>
                <motion.div animate={{ rotate: isCollapsed ? -90 : 0 }}>
                    <ChevronDown size={20} className="text-slate-300" />
                </motion.div>
            </div>

            <AnimatePresence>
                {!isCollapsed && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 gap-3">
                            {Object.entries(stats.byTaskType).map(([typeName, typeStat]: [string, any]) => (
                                <div 
                                    key={typeName} 
                                    onClick={() => {
                                        onSelectEntity({
                                            type: 'TASK_TYPE',
                                            id: typeName,
                                            name: typeName,
                                            stats: typeStat
                                        });
                                    }}
                                    className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer group hover:border-blue-100 transition-all hover:bg-white"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-primary">
                                            <ArrowUpRight size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{typeName}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{typeStat.totalTasks} Tasks</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900">{typeStat.points} pts</p>
                                        <div className="w-20 h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                                            <div 
                                                className="h-full bg-primary rounded-full" 
                                                style={{ width: `${(typeStat.points / (stats.totalPoints || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default TaskCategoryBreakdown;
