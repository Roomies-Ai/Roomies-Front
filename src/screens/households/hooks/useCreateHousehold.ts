import { useState, useEffect } from 'react';
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

    const handleAddPet = () => {
        if (newPetName.trim()) {
            setPets([...pets, { name: newPetName.trim(), kind: newPetKind.trim() || 'Pet' }]);
            setNewPetName('');
            setNewPetKind('');
        }
    };

    const handleRemovePet = (index: number) => {
        setPets(pets.filter((_, i) => i !== index));
    };

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
                pets
            });

            setSuggestedTasks(suggestions.map(t => ({ ...t, approved: true })));
        } catch (err: any) {
            setError('Failed to generate suggestions. You can still add tasks manually.');
            setStep(4); // Still move forward so they can add manual tasks
        } finally {
            setIsLoading(false);
            setIsGeneratingTasks(false);
        }
    };

    const handleToggleTask = (index: number) => {
        setSuggestedTasks(prev => prev.map((t, i) => 
            i === index ? { ...t, approved: !t.approved } : t
        ));
    };

    const handleUpdateTask = (index: number, updates: Partial<SuggestedTask>) => {
        setSuggestedTasks(prev => prev.map((t, i) => 
            i === index ? { ...t, ...updates } : t
        ));
    };

    const handleAddManualTask = () => {
        setSuggestedTasks(prev => [
            ...prev,
            {
                title: 'New Task',
                description: 'Describe what needs to be done',
                points: 3,
                status: 'pending',
                approved: true,
                isCustom: true
            }
        ]);
    };

    const handleRemoveTask = (index: number) => {
        setSuggestedTasks(prev => prev.filter((_, i) => i !== index));
    };

    const handleFinish = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // 1. Create the household first
            const household = await householdApi.createHousehold({ 
                name, 
                houseTypeId: selectedTypeId || undefined,
                pets: pets.length > 0 ? pets : undefined,
            });

            // 2. Bulk create approved tasks for the new household
            const approvedTasks = suggestedTasks.filter(t => t.approved);
            if (approvedTasks.length > 0) {
                await taskApi.bulkCreate(household.id, approvedTasks);
            }
            
            navigate('/home');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to complete household setup');
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => {
        if (step === 3) handleGenerateSuggestions();
        else setStep(s => s + 1);
    };

    const prevStep = () => {
        if (step === 1) navigate(-1);
        else if (step === 4) {
            // Cannot easily go back after household is created without more logic
            // For now, let's just allow it but maybe warn
            setStep(3);
        }
        else setStep(s => s - 1);
    };

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
