import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, AlertTriangle } from 'lucide-react';
import type { LeaveHouseholdModalProps } from '../HouseholdDetail.types';

const LeaveHouseholdModal = ({ isOpen, onClose, onConfirm, householdName }: LeaveHouseholdModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                        animate={{ scale: 1, opacity: 1, y: 0 }} 
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                                <LogOut size={40} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Leave Household?</h3>
                            <p className="text-sm text-slate-500 font-medium px-4">
                                Are you sure you want to leave <span className="font-black text-slate-900">"{householdName}"</span>? 
                                You will lose access to all shared tasks and history.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-2xl mb-8 border border-amber-100/50">
                            <AlertTriangle size={20} className="text-amber-500 shrink-0" />
                            <p className="text-[10px] text-amber-700 font-bold text-left leading-relaxed">
                                This action is permanent. To rejoin, you'll need a new invite code from a member.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={onClose}
                                className="py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={onConfirm}
                                className="py-4 bg-red-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-red-200 hover:bg-red-600 transition-all"
                            >
                                Yes, Leave
                            </button>
                        </div>

                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-300"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LeaveHouseholdModal;
