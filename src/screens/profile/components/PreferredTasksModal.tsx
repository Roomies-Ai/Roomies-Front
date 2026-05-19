import { motion, AnimatePresence } from 'framer-motion';

// Components
import PreferredTasksHeader from './PreferredTasksHeader';
import PreferredTasksList from './PreferredTasksList';
import PreferredTasksFooter from './PreferredTasksFooter';

// Hooks
import { usePreferredTasks } from '../hooks/usePreferredTasks';

// Types
import type { PreferredTasksModalProps } from '../types/preferredTasks.types';

const PreferredTasksModal = ({ isOpen, onClose, user, onUpdate }: PreferredTasksModalProps) => {
    const {
        selectedIds,
        loading,
        fetching,
        searchQuery,
        setSearchQuery,
        filteredTypes,
        toggleType,
        handleSave
    } = usePreferredTasks(isOpen, user, onUpdate, onClose);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
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
                        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-premium flex flex-col max-h-[85vh] overflow-hidden"
                    >
                        <PreferredTasksHeader 
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            fetching={fetching}
                            onClose={onClose}
                        />

                        <PreferredTasksList 
                            fetching={fetching}
                            filteredTypes={filteredTypes}
                            selectedIds={selectedIds}
                            toggleType={toggleType}
                        />

                        <PreferredTasksFooter 
                            onClose={onClose}
                            onSave={handleSave}
                            loading={loading}
                            fetching={fetching}
                            selectedCount={selectedIds.length}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PreferredTasksModal;
