export interface Pet {
    name: string;
    kind: string;
}

export interface Step3PetsProps {
    pets: Pet[];
    newPetName: string;
    setNewPetName: (name: string) => void;
    newPetKind: string;
    setNewPetKind: (kind: string) => void;
    onAddPet: () => void;
    onRemovePet: (index: number) => void;
    onCreate: () => void;
    isLoading: boolean;
    error: string | null;
}
