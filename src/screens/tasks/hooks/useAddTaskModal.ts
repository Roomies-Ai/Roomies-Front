import { useState, useEffect, useRef } from 'react';
import { taskApi } from '../../../api/task.api';
import { householdApi } from '../../../api/household.api';
import type { AddTaskModalProps } from '../components/AddTaskModal.types';

export const useAddTaskModal = ({ 
    isOpen, 
    onClose, 
    households, 
    onAdd, 
    onUpdate, 
    onDelete, 
    onRefresh, 
    taskToEdit,
    lockedHouseholdId
}: AddTaskModalProps) => {
    const [selectedHousehold, setSelectedHousehold] = useState(lockedHouseholdId || '');
    const [mode, setMode] = useState<'MANUAL' | 'AI'>('MANUAL');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState(5);
    const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
    const [selectedTaskType, setSelectedTaskType] = useState<string | number | null>(null);
    const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isAddingType, setIsAddingType] = useState(false);
    const [newTypeName, setNewTypeName] = useState('');
    const [isCreatingType, setIsCreatingType] = useState(false);
    const [aiMessage, setAiMessage] = useState('');
    const [isParsing, setIsParsing] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [activeHouseholdDetail, setActiveHouseholdDetail] = useState<any>(null);
    const householdDetailCache = useRef<Record<string, any>>({});

    useEffect(() => {
        if (lockedHouseholdId) {
            setSelectedHousehold(lockedHouseholdId);
            return;
        }
        if (households.length > 0 && !selectedHousehold) {
            setSelectedHousehold(households[0].id);
        }
    }, [households, selectedHousehold, lockedHouseholdId]);

    useEffect(() => {
        const fetchActiveDetail = async () => {
            if (!selectedHousehold) return;

            if (householdDetailCache.current[selectedHousehold]) {
                setActiveHouseholdDetail(householdDetailCache.current[selectedHousehold]);
                return;
            }

            const inList = households.find(h => h.id === selectedHousehold);
            if (inList && inList.members && inList.taskTypes) {
                householdDetailCache.current[selectedHousehold] = inList;
                setActiveHouseholdDetail(inList);
                return;
            }

            try {
                const full = await householdApi.getHouseholdById(selectedHousehold);
                householdDetailCache.current[selectedHousehold] = full;
                setActiveHouseholdDetail(full);
            } catch (err) {
                console.error('Failed to fetch active household detail', err);
            }
        };

        fetchActiveDetail();
    }, [selectedHousehold]);

    const activeHousehold = activeHouseholdDetail;

    useEffect(() => {
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
            
            const parentHousehold = households.find(h => 
                h.tasks?.some((t: any) => t.id === taskToEdit.id)
            );
            if (parentHousehold) {
                setSelectedHousehold(parentHousehold.id);
            }
            
            setMode('MANUAL');
        } else if (isOpen) {
            if (!taskToEdit) {
                setTitle('');
                setDescription('');
                setPoints(5);
                setSelectedAssignee(null);
                const generalType = activeHousehold?.taskTypes?.find((tt: any) => tt.name.toLowerCase() === 'general');
                setSelectedTaskType(generalType?.id || null);
                const today = new Date().toISOString().split('T')[0];
                setDueDate(today);
                setIsAddingType(false);
                setNewTypeName('');
            }
        }
    }, [taskToEdit, isOpen, households, activeHousehold]);

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
            const today = new Date().toISOString().split('T')[0];
            const sanitized = data.map((s: any) => ({
                ...s,
                description: s.description || s.title || 'Task generated via AI',
                dueDate: s.dueDate || today,
                isApproved: true
            }));
            setSuggestions(sanitized);
        } catch (err) {
            console.error(err);
        } finally {
            setIsParsing(false);
        }
    };

    const handleConfirmAi = () => {
        const approvedTasks = suggestions.filter(s => s.isApproved);
        if (approvedTasks.length === 0) return;
        onAdd(selectedHousehold, approvedTasks);
        resetAndClose();
    };

    const handleToggleSuggestion = (index: number) => {
        setSuggestions(prev => prev.map((s, i) => 
            i === index ? { ...s, isApproved: !s.isApproved } : s
        ));
    };

    const resetAndClose = () => {
        setTitle('');
        setDescription('');
        setPoints(5);
        setSelectedAssignee(null);
        setSelectedTaskType(null);
        setDueDate(new Date().toISOString().split('T')[0]);
        setAiMessage('');
        setSuggestions([]);
        onClose();
    };

    return {
        selectedHousehold, setSelectedHousehold,
        mode, setMode,
        title, setTitle,
        description, setDescription,
        points, setPoints,
        selectedAssignee, setSelectedAssignee,
        selectedTaskType, setSelectedTaskType,
        dueDate, setDueDate,
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
        handleAiParse,
        handleConfirmAi,
        handleToggleSuggestion,
        resetAndClose
    };
};
