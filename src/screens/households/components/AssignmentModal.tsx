import { X, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AssignmentModalProps } from '../HouseholdDetail.types';
import AISuggestionCard from './ui/AISuggestionCard';
import MemberAssignmentItem from './ui/MemberAssignmentItem';

const AssignmentModal = ({ 
    isOpen, 
    onClose, 
    household, 
    assigningTaskId, 
    currentUser, 
    handleAssignTask, 
    handleGetSuggestion, 
    isSuggesting, 
    suggestion 
}: AssignmentModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && assigningTaskId && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ y: "100%" }} 
                        animate={{ y: 0 }} 
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-xl bg-white rounded-t-[3rem] sm:rounded-[3rem] p-8 shadow-2xl overflow-hidden flex flex-col h-[80vh] sm:h-auto sm:max-h-[85vh]"
                    >
                        <div className="flex justify-between items-center mb-8 shrink-0">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Assign Task</h3>
                                <p className="text-sm text-slate-400 font-bold">Choose the best person for the job</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {!suggestion && (
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleGetSuggestion}
                                        disabled={isSuggesting}
                                        className="flex items-center gap-2 bg-gradient-to-r from-[#3B95EA] to-[#6366F1] text-white px-4 py-2 rounded-2xl text-xs font-black shadow-lg shadow-blue-200 disabled:opacity-50"
                                    >
                                        {isSuggesting ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                                        Magic Recommend
                                    </motion.button>
                                )}
                                <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto min-h-0 pr-2 -mr-2 space-y-3 pb-8">
                            {suggestion && <AISuggestionCard suggestion={suggestion} />}

                            {household.tasks?.find((t: any) => t.id === assigningTaskId)?.assignee && (
                                <button 
                                    onClick={() => handleAssignTask(assigningTaskId, null)}
                                    className="w-full flex items-center gap-4 p-5 rounded-[2.5rem] border-2 border-dashed border-slate-100 text-slate-400 font-bold hover:bg-slate-50 transition-all text-left group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                                        <X size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-500">Unassign</p>
                                        <p className="text-xs font-medium">Remove assignee from task</p>
                                    </div>
                                </button>
                            )}
                            
                            {household.members?.map((member: any) => (
                                <MemberAssignmentItem 
                                    key={member.id}
                                    member={member}
                                    isSuggested={suggestion?.userId === member.id}
                                    isMe={member.id === currentUser?.id}
                                    onClick={() => handleAssignTask(assigningTaskId, member.id)}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AssignmentModal;
