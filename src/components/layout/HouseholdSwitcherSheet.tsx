import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ListChecks, Check } from 'lucide-react';
import Avatar from '../ui/Avatar';
import type { Household } from '../../types/household';

interface HouseholdSwitcherSheetProps {
    isOpen: boolean;
    onClose: () => void;
    households: Household[];
    activeHouseholdId?: string;
    onSelect: (id: string) => void;
    onViewAll: () => void;
}

const HouseholdSwitcherSheet = ({ isOpen, onClose, households, activeHouseholdId, onSelect, onViewAll }: HouseholdSwitcherSheetProps) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] p-8 pb-10 shadow-2xl max-h-[70vh] overflow-y-auto"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-300"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Switch Household</h3>

                        <div className="space-y-3 mb-6">
                            {households.map((household) => {
                                const isCurrent = household.id === activeHouseholdId;
                                return (
                                    <button
                                        key={household.id}
                                        onClick={() => onSelect(household.id)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${
                                            isCurrent ? 'bg-primary/5 ring-2 ring-primary/20' : 'hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className="w-11 h-11 rounded-2xl overflow-hidden shrink-0">
                                            <Avatar name={household.name} className="w-full h-full text-xs" />
                                        </div>
                                        <span className="flex-1 font-black text-sm text-slate-900 truncate">
                                            {household.name}
                                        </span>
                                        {isCurrent && <Check size={18} className="text-primary shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={onViewAll}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all"
                        >
                            <ListChecks size={18} />
                            View All Households
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default HouseholdSwitcherSheet;
