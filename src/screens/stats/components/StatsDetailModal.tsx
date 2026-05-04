import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { StatsDetailModalProps } from '../StatsScreen.types';

// Modal Sub-components
import ModalHeader from './modal/ModalHeader';
import ModalVisuals from './modal/ModalVisuals';
import StatusTaskList from './modal/StatusTaskList';

const StatsDetailModal = ({ 
    selectedEntity, 
    onClose, 
    modalCharts, 
    selectedStatus, 
    onSelectStatus, 
    filteredTasks, 
    onTakeTask 
}: StatsDetailModalProps) => {
    const statuses = [
        { label: 'Completed', id: 'completed', color: 'bg-green-500' },
        { label: 'In Progress', id: 'in-progress', color: 'bg-blue-400' },
        { label: 'Pending', id: 'pending', color: 'bg-slate-300' },
        { label: 'Overdue', id: 'overdue', color: 'bg-red-500' }
    ].filter(status => {
        if (selectedEntity.id === 'Unassigned') {
            return status.id === 'pending' || status.id === 'overdue';
        }
        return true;
    });

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all z-[80] shadow-sm"
                >
                    <X size={20} />
                </button>

                <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                    <ModalHeader selectedEntity={selectedEntity} />

                    <ModalVisuals 
                        selectedEntity={selectedEntity} 
                        modalCharts={modalCharts} 
                    />

                    <div className="flex flex-col gap-3">
                        {statuses.map(status => (
                            <StatusTaskList 
                                key={status.id}
                                status={status}
                                selectedEntity={selectedEntity}
                                selectedStatus={selectedStatus}
                                onSelectStatus={onSelectStatus}
                                filteredTasks={filteredTasks}
                                onTakeTask={onTakeTask}
                            />
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <div className="flex items-center justify-center px-2">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Impact</p>
                                <p className="text-xl font-black text-slate-900">{selectedEntity.stats.points} Points</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StatsDetailModal;
