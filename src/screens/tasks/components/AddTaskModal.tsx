import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Plus, Loader2, MessageSquare, ListPlus, User as UserIcon, Check, Tag, Coins, Calendar } from 'lucide-react';
import { taskApi } from '../../../api/task.api';
import { householdApi } from '../../../api/household.api';
import MemberAvatar from '../../households/components/ui/MemberAvatar';
import TaskIcon from '../../households/components/ui/TaskIcon';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    households: any[];
    onAdd: (householdId: string, taskData: any) => void;
    onUpdate?: (taskId: string, updates: any) => void;
    onDelete?: (taskId: string) => void;
    onRefresh?: () => void;
    taskToEdit?: any;
}

const AddTaskModal = ({ isOpen, onClose, households, onAdd, onUpdate, onDelete, onRefresh, taskToEdit }: AddTaskModalProps) => {
    const [selectedHousehold, setSelectedHousehold] = useState('');
    const [mode, setMode] = useState<'MANUAL' | 'AI'>('MANUAL');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState(5);
    const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
    const [selectedTaskType, setSelectedTaskType] = useState<string | null>(null);
    const [dueDate, setDueDate] = useState<string>('');
    const [isAddingType, setIsAddingType] = useState(false);
    const [newTypeName, setNewTypeName] = useState('');
    const [isCreatingType, setIsCreatingType] = useState(false);
    const [aiMessage, setAiMessage] = useState('');
    const [isParsing, setIsParsing] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const activeHousehold = households.find(h => h.id === selectedHousehold);

    React.useEffect(() => {
        if (households.length > 0 && !selectedHousehold) {
            setSelectedHousehold(households[0].id);
        }
    }, [households, selectedHousehold]);

    // Populate fields when editing or reset when household changes
    React.useEffect(() => {
        if (taskToEdit && isOpen) {
            setTitle(taskToEdit.title || '');
            setDescription(taskToEdit.description || '');
            setPoints(taskToEdit.points || 5);
            setSelectedAssignee(taskToEdit.assignee?.username || null);
            setSelectedTaskType(taskToEdit.taskType?.id || null);
            if (taskToEdit.dueDate) {
                const d = new Date(taskToEdit.dueDate);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                setDueDate(`${year}-${month}-${day}`);
            } else {
                setDueDate('');
            }
            
            // Find which household this task belongs to in our local state
            const parentHousehold = households.find(h => 
                h.tasks?.some((t: any) => t.id === taskToEdit.id)
            );
            if (parentHousehold) {
                setSelectedHousehold(parentHousehold.id);
            }
            
            setMode('MANUAL');
        } else if (isOpen) {
            // Only reset if we are opening a NEW task (not editing)
            if (!taskToEdit) {
                setTitle('');
                setDescription('');
                setPoints(5);
                setSelectedAssignee(null);
                const generalType = activeHousehold?.taskTypes?.find((tt: any) => tt.name.toLowerCase() === 'general');
                setSelectedTaskType(generalType?.id || null);
                setDueDate('');
                setIsAddingType(false);
                setNewTypeName('');
            }
        }
    }, [taskToEdit, isOpen, households]);

    const handleAddType = async () => {
        if (!newTypeName.trim() || !selectedHousehold) return;
        setIsCreatingType(true);
        try {
            const newType = await householdApi.addTaskType(selectedHousehold, newTypeName);
            if (onRefresh) onRefresh();
            setSelectedTaskType(newType.id);
            setIsAddingType(false);
            setNewTypeName('');
        } catch (err) {
            console.error('Failed to create task type:', err);
        } finally {
            setIsCreatingType(false);
        }
    };

    const handleManualSubmit = () => {
        if (!title.trim() || !description.trim() || !dueDate || !selectedHousehold) return;
        
        const taskData = { 
            title, 
            description, 
            status: selectedAssignee ? 'in-progress' : 'pending', 
            points,
            assignee: selectedAssignee,
            taskType: selectedTaskType,
            dueDate
        };

        if (taskToEdit && onUpdate) {
            onUpdate(taskToEdit.id, taskData);
        } else {
            onAdd(selectedHousehold, taskData);
        }
        resetAndClose();
    };

    const handleDelete = () => {
        if (taskToEdit && onDelete) {
            onDelete(taskToEdit.id);
            resetAndClose();
        }
    };

    const handleAiParse = async () => {
        if (!aiMessage.trim() || !selectedHousehold) return;
        setIsParsing(true);
        try {
            const data = await taskApi.parseTelegram(selectedHousehold, aiMessage);
            // Ensure each suggestion has a description
            const sanitized = data.map((s: any) => ({
                ...s,
                description: s.description || s.title || 'Task generated via AI'
            }));
            setSuggestions(sanitized);
        } catch (err) {
            console.error(err);
        } finally {
            setIsParsing(false);
        }
    };

    const handleConfirmAi = () => {
        onAdd(selectedHousehold, suggestions);
        resetAndClose();
    };

    const resetAndClose = () => {
        setTitle('');
        setDescription('');
        setPoints(5);
        setSelectedAssignee(null);
        setSelectedTaskType(null);
        setDueDate('');
        setAiMessage('');
        setSuggestions([]);
        onClose();
    };

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

                        {/* Household Selector - Hidden when editing */}
                        {!taskToEdit && (
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Select Household</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {households.map(h => (
                                        <button
                                            key={h.id}
                                            onClick={() => setSelectedHousehold(h.id)}
                                            className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                                                selectedHousehold === h.id 
                                                ? 'border-primary bg-primary/5 text-primary' 
                                                : 'border-slate-50 bg-white text-slate-600'
                                            }`}
                                        >
                                            <span className="font-black">{h.name}</span>
                                            {selectedHousehold === h.id && <Plus size={18} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Mode Switcher - Hidden when editing */}
                        {!taskToEdit && (
                            <div className="flex p-1.5 bg-slate-100 rounded-3xl">
                                <button 
                                    onClick={() => setMode('MANUAL')}
                                    className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${mode === 'MANUAL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                                >
                                    <ListPlus size={18} />
                                    Manual
                                </button>
                                <button 
                                    onClick={() => setMode('AI')}
                                    className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${mode === 'AI' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                                >
                                    <Sparkles size={18} />
                                    Magic AI
                                </button>
                            </div>
                        )}

                        {mode === 'MANUAL' ? (
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    <input 
                                        type="text" 
                                        placeholder="Task Title (e.g. Wash the dishes)"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900 transition-all placeholder:text-slate-300"
                                    />
                                    <textarea 
                                        placeholder="Task Description (e.g. Please clean all plates and pans)"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-2 border-transparent focus:border-primary focus:bg-white outline-none font-medium text-slate-900 transition-all placeholder:text-slate-300 resize-none"
                                    />

                                    {/* Points Selection */}
                                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-[1.5rem] border-2 border-transparent">
                                        <div className="flex items-center gap-3 ml-1">
                                            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-600 flex items-center justify-center">
                                                <Coins size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Points Reward</p>
                                                <p className="text-xs font-bold text-slate-900">Value for completing</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                                            <button 
                                                onClick={() => setPoints(Math.max(1, points - 1))}
                                                className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center font-black hover:bg-slate-100"
                                            >
                                                -
                                            </button>
                                            <input 
                                                type="number"
                                                value={points}
                                                onChange={(e) => setPoints(Math.max(0, parseInt(e.target.value) || 0))}
                                                className="font-black text-slate-900 w-12 text-center bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            />
                                            <button 
                                                onClick={() => setPoints(points + 1)}
                                                className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black hover:bg-slate-800"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Due Date Selection */}
                                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-[1.5rem] border-2 border-transparent focus-within:border-primary focus-within:bg-white transition-all">
                                        <div className="flex items-center gap-3 ml-1">
                                            <div className="w-10 h-10 rounded-xl bg-blue-400/10 text-blue-600 flex items-center justify-center">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</p>
                                                <p className="text-xs font-bold text-slate-900">Completion deadline</p>
                                            </div>
                                        </div>
                                        <input 
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            required
                                            className="font-black text-slate-900 bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100 outline-none text-xs"
                                        />
                                    </div>
                                </div>

                                {/* Assignee Selector */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Assign to (Optional)</label>
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                        <button 
                                            onClick={() => setSelectedAssignee(null)}
                                            className={`shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                                                selectedAssignee === null 
                                                ? 'border-primary bg-primary/5' 
                                                : 'border-slate-50 bg-white'
                                            }`}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedAssignee === null ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400'}`}>
                                                <UserIcon size={20} />
                                            </div>
                                            <span className={`text-[10px] font-black truncate w-16 text-center ${selectedAssignee === null ? 'text-primary' : 'text-slate-400'}`}>Unassigned</span>
                                        </button>

                                        {activeHousehold?.members?.map((member: any) => (
                                            <button 
                                                key={member.id}
                                                onClick={() => setSelectedAssignee(member.username)}
                                                className={`shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                                                    selectedAssignee === member.username 
                                                    ? 'border-primary bg-primary/5' 
                                                    : 'border-slate-50 bg-white'
                                                }`}
                                            >
                                                <MemberAvatar 
                                                    username={member.username} 
                                                    size="w-12 h-12" 
                                                    border={selectedAssignee === member.username} 
                                                />
                                                <span className={`text-[10px] font-black truncate w-16 text-center ${selectedAssignee === member.username ? 'text-primary' : 'text-slate-400'}`}>
                                                    {member.username}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Task Type Selector */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Task Category</label>
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        {/* Add New Type Button/Input */}
                                        <div className="shrink-0 flex items-center gap-2">
                                            {isAddingType ? (
                                                <motion.div 
                                                    initial={{ width: 0, opacity: 0 }}
                                                    animate={{ width: 'auto', opacity: 1 }}
                                                    className="flex items-center gap-2 bg-white border-2 border-primary/20 rounded-2xl px-3 py-1.5"
                                                >
                                                    <input 
                                                        autoFocus
                                                        type="text" 
                                                        placeholder="New Category..."
                                                        value={newTypeName}
                                                        onChange={(e) => setNewTypeName(e.target.value)}
                                                        className="bg-transparent outline-none text-xs font-bold text-slate-900 w-24"
                                                        onKeyDown={(e) => e.key === 'Enter' && handleAddType()}
                                                    />
                                                    <button 
                                                        onClick={handleAddType}
                                                        disabled={!newTypeName.trim() || isCreatingType}
                                                        className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-50"
                                                    >
                                                        {isCreatingType ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                                                    </button>
                                                    <button 
                                                        onClick={() => setIsAddingType(false)}
                                                        className="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </motion.div>
                                            ) : (
                                                <button 
                                                    onClick={() => setIsAddingType(true)}
                                                    className="w-10 h-10 rounded-2xl border-2 border-dashed border-slate-200 text-slate-300 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            )}
                                        </div>

                                        {activeHousehold?.taskTypes?.map((type: any) => (
                                            <button 
                                                key={type.id}
                                                onClick={() => setSelectedTaskType(type.id)}
                                                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition-all font-bold text-xs ${
                                                    selectedTaskType === type.id 
                                                    ? 'border-primary bg-primary/5 text-primary' 
                                                    : 'border-slate-50 bg-white text-slate-400'
                                                }`}
                                            >
                                                <TaskIcon title={type.name} size={14} />
                                                {type.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {taskToEdit && (
                                        <button 
                                            onClick={handleDelete}
                                            className="px-5 bg-red-50 text-red-500 rounded-[1.5rem] font-bold transition-all hover:bg-red-100 flex items-center justify-center"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    )}
                                    <button 
                                        onClick={handleManualSubmit}
                                        disabled={!title.trim() || !description.trim() || !dueDate}
                                        className="flex-1 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-slate-200 disabled:opacity-50 transition-all"
                                    >
                                        {taskToEdit ? 'Update Task' : 'Add Task'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {suggestions.length === 0 ? (
                                    <>
                                        <textarea 
                                            placeholder="Tell me what happened in free text (e.g. Felix cooked dinner and David did the dishes, add those to our list)"
                                            value={aiMessage}
                                            onChange={(e) => setAiMessage(e.target.value)}
                                            rows={4}
                                            className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-2 border-transparent focus:border-primary focus:bg-white outline-none font-medium text-slate-900 transition-all placeholder:text-slate-300 resize-none"
                                        />
                                        <button 
                                            onClick={handleAiParse}
                                            disabled={!aiMessage.trim() || isParsing}
                                            className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                                        >
                                            {isParsing ? <Loader2 className="animate-spin" /> : <Sparkles />}
                                            {isParsing ? 'Magic in progress...' : 'Generate with AI'}
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50 border-2 border-primary/10 rounded-3xl">
                                            <p className="text-xs font-black text-primary uppercase tracking-widest mb-3">AI extracted these tasks:</p>
                                            <div className="space-y-2">
                                                {suggestions.map((s, i) => (
                                                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-blue-100 shadow-sm">
                                                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                                                            <MessageSquare size={16} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-slate-900 truncate">{s.title}</p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <p className="text-[10px] text-slate-400 font-bold">{s.assignee ? `Assign to ${s.assignee}` : 'Unassigned'}</p>
                                                                {s.taskType && (
                                                                    <div className="flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded-lg">
                                                                        <Tag size={8} className="text-primary" />
                                                                        <span className="text-[8px] font-black text-primary uppercase">{s.taskType}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => setSuggestions([])}
                                                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold"
                                            >
                                                Back
                                            </button>
                                            <button 
                                                onClick={handleConfirmAi}
                                                className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20"
                                            >
                                                Confirm & Add
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddTaskModal;
