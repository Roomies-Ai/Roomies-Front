import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown } from 'lucide-react';
import type { AiTaskAssigneeDropdownProps } from './AddTaskModal.types';

const AiTaskAssigneeDropdown = ({ suggestion, index, suggestions, setSuggestions, activeHousehold }: AiTaskAssigneeDropdownProps) => {
    const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
    const members = activeHousehold?.members || [];

    return (
        <div className="relative">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsAssigneeOpen(!isAssigneeOpen);
                }}
                className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors"
            >
                <User size={8} className="text-slate-400" />
                <span className="text-[8px] font-black text-slate-600 uppercase">
                    {suggestion.assignee || 'Unassigned'}
                </span>
                <ChevronDown size={8} className={`text-slate-400 transition-transform ${isAssigneeOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isAssigneeOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsAssigneeOpen(false);
                            }}
                            className="fixed inset-0 z-[100]"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute left-0 top-full mt-1 w-40 bg-white rounded-xl shadow-premium border border-slate-50 overflow-hidden z-[101] p-1"
                        >
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const updated = [...suggestions];
                                    updated[index] = { ...updated[index], assignee: null };
                                    setSuggestions(updated);
                                    setIsAssigneeOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                                    !suggestion.assignee ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                Unassigned
                            </button>
                            {members.map((member: any) => (
                                <button 
                                    key={member.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const updated = [...suggestions];
                                        updated[index] = { ...updated[index], assignee: member.username };
                                        setSuggestions(updated);
                                        setIsAssigneeOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                                        suggestion.assignee === member.username 
                                        ? 'bg-primary/10 text-primary' 
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {member.username}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AiTaskAssigneeDropdown;
