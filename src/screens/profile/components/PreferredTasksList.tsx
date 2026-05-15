import React from 'react';
import { motion } from 'framer-motion';
import { Check, Home, Search, Loader2 } from 'lucide-react';
import type { PreferredTasksListProps } from '../types/preferredTasks.types';

const PreferredTasksList: React.FC<PreferredTasksListProps> = ({
    fetching,
    filteredTypes,
    selectedIds,
    toggleType
}) => {
    return (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Available Task Types</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">
                    {selectedIds.length} Selected
                </span>
            </div>

            {fetching ? (
                <div className="py-20 flex flex-col items-center gap-4 text-slate-300">
                    <Loader2 size={32} className="animate-spin" />
                    <p className="text-xs font-bold uppercase tracking-widest">Scanning Households...</p>
                </div>
            ) : filteredTypes.length > 0 ? (
                filteredTypes.map((type) => {
                    const isSelected = selectedIds.includes(type.id);
                    return (
                        <button
                            key={type.id}
                            onClick={() => toggleType(type.id)}
                            className={`group flex items-center justify-between p-5 rounded-[1.5rem] border transition-all duration-300 ${
                                isSelected 
                                    ? 'bg-primary/5 border-primary shadow-premium-sm' 
                                    : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                            }`}
                        >
                            <div className="flex items-center gap-4 text-left">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                                    <Check size={20} strokeWidth={3} />
                                </div>
                                <div>
                                    <p className={`text-sm font-black transition-colors ${isSelected ? 'text-primary' : 'text-slate-900'}`}>
                                        {type.name}
                                    </p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <Home size={10} className="text-slate-400" />
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                                            {type.householdName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {isSelected && (
                                <motion.div 
                                    initial={{ scale: 0 }} 
                                    animate={{ scale: 1 }} 
                                    className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center"
                                >
                                    <Check size={12} strokeWidth={4} />
                                </motion.div>
                            )}
                        </button>
                    );
                })
            ) : (
                <div className="py-14 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                        <Search size={24} />
                    </div>
                    <p className="text-slate-400 font-black text-sm tracking-tight">No tasks found</p>
                    <p className="text-slate-300 text-[10px] font-bold uppercase mt-1">Try a different search term</p>
                </div>
            )}
        </div>
    );
};

export default PreferredTasksList;
