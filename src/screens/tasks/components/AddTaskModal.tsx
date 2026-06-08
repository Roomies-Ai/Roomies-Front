import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import type { AddTaskModalProps } from './AddTaskModal.types';
import ManualTaskForm from './ManualTaskForm';
import AiTaskSection from './AiTaskSection';
import HouseholdSelector from './HouseholdSelector';
import ModeSwitcher from './ModeSwitcher';

import { useAddTaskModal } from '../hooks/useAddTaskModal';

const AddTaskModal = (props: AddTaskModalProps) => {
    const { isOpen, onClose, households, taskToEdit } = props;
    const {
        selectedHousehold, setSelectedHousehold,
        mode, setMode,
        title, setTitle,
        description, setDescription,
        points, setPoints,
        selectedAssignee, setSelectedAssignee,
        selectedTaskType, setSelectedTaskType,
        dueDate, setDueDate,
        recurrenceRule, setRecurrenceRule,
        isAddingType, setIsAddingType,
        newTypeName, setNewTypeName,
        isCreatingType,
        aiMessage, setAiMessage,
        isParsing,
        suggestions, setSuggestions,
        activeHousehold,
        handleAddType,
        handleManualSubmit,
        handleDelete,
        handleClearRecurrence,
        handleAiParse,
        handleConfirmAi,
        handleToggleSuggestion
    } = useAddTaskModal(props);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-lg bg-white rounded-t-[3rem] sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                >
                    <div className="p-8 flex flex-col gap-6 overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h3>
                                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{taskToEdit ? 'Update details' : 'To your household'}</p>
                            </div>
                            <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {!taskToEdit && !props.lockedHouseholdId && (
                            <HouseholdSelector 
                                households={households} 
                                selectedHousehold={selectedHousehold} 
                                setSelectedHousehold={setSelectedHousehold} 
                            />
                        )}

                        {!taskToEdit && (
                            <ModeSwitcher mode={mode} setMode={setMode} />
                        )}

                        {mode === 'MANUAL' ? (
                            <ManualTaskForm 
                                title={title} setTitle={setTitle}
                                description={description} setDescription={setDescription}
                                points={points} setPoints={setPoints}
                                dueDate={dueDate} setDueDate={setDueDate}
                                selectedAssignee={selectedAssignee} setSelectedAssignee={setSelectedAssignee}
                                selectedTaskType={selectedTaskType} setSelectedTaskType={setSelectedTaskType}
                                activeHousehold={activeHousehold}
                                isAddingType={isAddingType} setIsAddingType={setIsAddingType}
                                newTypeName={newTypeName} setNewTypeName={setNewTypeName}
                                isCreatingType={isCreatingType} handleAddType={handleAddType}
                                onSubmit={handleManualSubmit}
                                onDelete={handleDelete}
                                onClearRecurrence={handleClearRecurrence}
                                isEdit={!!taskToEdit}
                                taskToEdit={taskToEdit}
                                recurrenceRule={recurrenceRule}
                                setRecurrenceRule={setRecurrenceRule}
                            />
                        ) : (
                            <AiTaskSection 
                                aiMessage={aiMessage} setAiMessage={setAiMessage}
                                isParsing={isParsing} handleAiParse={handleAiParse}
                                suggestions={suggestions} setSuggestions={setSuggestions}
                                handleToggleSuggestion={handleToggleSuggestion}
                                handleConfirmAi={handleConfirmAi}
                                activeHousehold={activeHousehold}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddTaskModal;
