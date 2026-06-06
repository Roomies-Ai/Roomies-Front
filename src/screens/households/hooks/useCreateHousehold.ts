import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { householdApi } from '../../../api/household.api';
import { HOUSE_TYPES } from '../../../api/houseType.api';
import { taskApi, type SuggestedTask } from '../../../api/task.api';

export const useCreateHousehold = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(HOUSE_TYPES[0]);
    const [pets, setPets] = useState<{ name: string; kind: string }[]>([]);
    const [newPetName, setNewPetName] = useState('');
    const [newPetKind, setNewPetKind] = useState('');

    // Step 4: Task Suggestions
    const [suggestedTasks, setSuggestedTasks] = useState<(SuggestedTask & { approved: boolean })[]>([]);
    const [isGeneratingTasks, setIsGeneratingTasks] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddPet = useCallback(() => {
        if (newPetName.trim()) {
            setPets([...pets, { name: newPetName.trim(), kind: newPetKind.trim() || 'Pet' }]);
            setNewPetName('');
            setNewPetKind('');
        }
    }, [newPetName, newPetKind, pets]);

    const handleRemovePet = useCallback((index: number) => {
        setPets(pets.filter((_, i) => i !== index));
    }, [pets]);

    const handleGenerateSuggestions = async () => {
        setIsLoading(true);
        setError(null);

        try {
            setStep(4);
            setIsGeneratingTasks(true);

            const suggestions = await taskApi.generateSuggestions({
                name,
                houseType: selectedType,
                pets,
                taskTypes: [
                    { name: 'General' },
                    { name: 'Cooking' },
                    { name: 'Cleaning' },
                    { name: 'Groceries' },
                    { name: 'Maintenance' },
                    { name: 'Trash/Recycling' },
                    { name: 'Laundry' }
                ]
            });

            const today = new Date().toISOString().split('T')[0];
            setSuggestedTasks(suggestions.map(t => ({
                ...t,
                approved: true,
                dueDate: t.dueDate || today
            })));
        } catch (err: any) {
            setError('Failed to generate suggestions. You can still add tasks manually.');
            setStep(4);
        } finally {
            setIsLoading(false);
            setIsGeneratingTasks(false);
        }
    };

    const handleToggleTask = useCallback((index: number) => {
        setSuggestedTasks(prev => prev.map((t, i) =>
            i === index ? { ...t, approved: !t.approved } : t
        ));
    }, []);

    const handleUpdateTask = useCallback((index: number, updates: Partial<SuggestedTask>) => {
        setSuggestedTasks(prev => prev.map((t, i) =>
            i === index ? { ...t, ...updates } : t
        ));
    }, []);

    const handleAddManualTask = useCallback(() => {
        setSuggestedTasks(prev => [
            ...prev,
            {
                title: 'New Task',
                description: 'Describe what needs to be done',
                points: 3,
                status: 'pending',
                taskType: 'General',
                dueDate: new Date().toISOString().split('T')[0],
                approved: true,
                isCustom: true
            }
        ]);
    }, []);

    const handleRemoveTask = useCallback((index: number) => {
        setSuggestedTasks(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleFinish = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const household = await householdApi.createHousehold({
                name,
                houseType: selectedType || undefined,
                pets: pets.length > 0 ? pets : undefined,
            });

            const today = new Date().toISOString().split('T')[0];
            const approvedTasks = suggestedTasks
                .filter(t => t.approved)
                .map(t => ({
                    ...t,
                    dueDate: t.dueDate || today
                }));

            if (approvedTasks.length > 0) {
                await taskApi.bulkCreate(household.id, approvedTasks);
            }

            navigate('/home');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to complete household setup');
        } finally {
            setIsLoading(false);
        }
    }, [name, selectedType, pets, suggestedTasks, navigate]);

    const nextStep = useCallback(() => {
        if (step === 3) handleGenerateSuggestions();
        else setStep(s => s + 1);
    }, [step, handleGenerateSuggestions]);

    const prevStep = useCallback(() => {
        if (step === 1) navigate(-1);
        else if (step === 4) {
            setStep(3);
        }
        else setStep(s => s - 1);
    }, [step, navigate]);

    return {
        step,
        name,
        setName,
        houseTypes: HOUSE_TYPES,
        selectedType,
        setSelectedType,
        pets,
        newPetName,
        setNewPetName,
        newPetKind,
        setNewPetKind,
        suggestedTasks,
        isGeneratingTasks,
        isLoading,
        error,
        handleAddPet,
        handleGenerateSuggestions,
        handleToggleTask,
        handleUpdateTask,
        handleAddManualTask,
        handleRemoveTask,
        handleFinish,
        nextStep,
        prevStep,
        handleRemovePet
    };
};