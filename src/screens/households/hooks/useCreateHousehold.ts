import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { householdApi } from '../../../api/household.api';
import { type HouseType, houseTypeApi } from '../../../api/houseType.api';
import { taskApi, type SuggestedTask } from '../../../api/task.api';

export const useCreateHousehold = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);
    const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
    const [pets, setPets] = useState<{ name: string; kind: string }[]>([]);
    const [newPetName, setNewPetName] = useState('');
    const [newPetKind, setNewPetKind] = useState('');
    
    // Step 4: Task Suggestions
    const [suggestedTasks, setSuggestedTasks] = useState<(SuggestedTask & { approved: boolean })[]>([]);
    const [isGeneratingTasks, setIsGeneratingTasks] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingTypes, setIsFetchingTypes] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const types = await houseTypeApi.getAll();
                const sortedTypes = [...types].sort((a, b) => {
                    if (a.name === 'Other') return 1;
                    if (b.name === 'Other') return -1;
                    return 0;
                });
                setHouseTypes(sortedTypes);
                if (sortedTypes.length > 0) setSelectedTypeId(sortedTypes[0].id);
            } catch (err) {
                console.error('Failed to fetch house types', err);
            } finally {
                setIsFetchingTypes(false);
            }
        };
        fetchTypes();
    }, []);

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
            const selectedType = houseTypes.find(t => t.id === selectedTypeId);
            setStep(4);
            setIsGeneratingTasks(true);

            // Fetch AI task suggestions using current draft data
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
            setStep(4); // Still move forward so they can add manual tasks
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
                houseTypeId: selectedTypeId || undefined,
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
    }, [name, selectedTypeId, pets, suggestedTasks, navigate]);

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
        houseTypes,
        selectedTypeId,
        setSelectedTypeId,
        pets,
        newPetName,
        setNewPetName,
        newPetKind,
        setNewPetKind,
        suggestedTasks,
        isGeneratingTasks,
        isLoading,
        isFetchingTypes,
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
