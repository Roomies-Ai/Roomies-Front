import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, UserPlus } from 'lucide-react';
import type { StatusTaskListProps } from '../../StatsScreen.types';

const StatusTaskList = ({ 
    status, 
    selectedEntity, 
    selectedStatus, 
    onSelectStatus, 
    filteredTasks, 
    onTakeTask 
}: StatusTaskListProps) => {
    return (
        <div className="flex flex-col gap-2">
            <button 
                onClick={() => onSelectStatus(selectedStatus === status.id ? null : status.id)}
                className={`bg-slate-50 p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                    selectedStatus === status.id ? 'border-primary bg-blue-50/30' : 'border-white'
                }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <span className="text-xs font-black text-slate-600 uppercase tracking-wider">{status.label}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">{selectedEntity.stats.statusCounts[status.id] || 0}</span>
                    <motion.div animate={{ rotate: selectedStatus === status.id ? 90 : 0 }}>
                        <ChevronRight size={16} className="text-slate-300" />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence>
                {selectedStatus === status.id && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden px-2"
                    >
                        <div className="flex flex-col gap-2 py-2">
                            {filteredTasks.length > 0 ? filteredTasks.map((t: any) => (
                                <div key={t.id} className="bg-white/50 p-3 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-slate-700 truncate">{t.title}</p>
                                        <p className="text-[10px] text-slate-400 uppercase font-black">{t.taskType?.name || 'General'}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {selectedEntity.type === 'TASK_TYPE' && t.assignee && (
                                            <div className="px-2 py-1 bg-slate-100 rounded-lg shrink-0">
                                                <span className="text-[9px] font-black text-slate-500 uppercase">{t.assignee.username}</span>
                                            </div>
                                        )}
                                        {selectedEntity.id === 'Unassigned' && (
                                            <button 
                                                onClick={() => onTakeTask(t.id)}
                                                className="p-2 bg-blue-50 text-primary rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                                            >
                                                <UserPlus size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <p className="text-[10px] text-slate-400 font-bold uppercase text-center py-2">No tasks found</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StatusTaskList;
