import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { householdApi } from '../../../api/household.api';
import { type HouseType, houseTypeApi } from '../../../api/houseType.api';

export const useCreateHousehold = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);
    const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
    const [pets, setPets] = useState<{ name: string; kind: string }[]>([]);
    const [newPetName, setNewPetName] = useState('');
    const [newPetKind, setNewPetKind] = useState('');
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

    const handleCreate = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await householdApi.createHousehold({ 
                name, 
                houseTypeId: selectedTypeId || undefined,
                pets: pets.length > 0 ? pets : undefined,
            });

            navigate('/home');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create household');
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => {
        if (step === 1) navigate(-1);
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
        isLoading,
        isFetchingTypes,
        error,
        handleAddPet,
        handleRemovePet,
        handleCreate,
        nextStep,
        prevStep
    };
};
