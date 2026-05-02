import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, ChevronDown } from 'lucide-react';
import type { AiTaskTypeDropdownProps } from './AddTaskModal.types';

const AiTaskTypeDropdown = ({ suggestion, index, suggestions, setSuggestions, activeHousehold }: AiTaskTypeDropdownProps) => {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const taskTypes = activeHousehold?.taskTypes || [];

    return (
        <div className="relative">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsTypeOpen(!isTypeOpen);
                }}
                className="flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded-lg hover:bg-primary/10 transition-colors"
            >
                <Tag size={8} className="text-primary" />
                <span className="text-[8px] font-black text-primary uppercase">{suggestion.taskType || 'General'}</span>
                <ChevronDown size={8} className={`text-primary transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isTypeOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsTypeOpen(false);
                            }}
                            className="fixed inset-0 z-[100]"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute left-0 top-full mt-1 w-32 bg-white rounded-xl shadow-premium border border-slate-50 overflow-hidden z-[101] p-1"
                        >
                            {taskTypes.length > 0 ? taskTypes.map((tt: any) => (
                                <button 
                                    key={tt.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const updated = [...suggestions];
                                        updated[index] = { ...updated[index], taskType: tt.name };
                                        setSuggestions(updated);
                                        setIsTypeOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                                        suggestion.taskType === tt.name 
                                        ? 'bg-primary/10 text-primary' 
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {tt.name}
                                </button>
                            )) : (
                                <p className="text-[8px] text-slate-400 p-2 text-center">No types available</p>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AiTaskTypeDropdown;
