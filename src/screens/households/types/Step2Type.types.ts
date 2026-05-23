export interface Step2TypeProps {
    houseTypes: string[];
    selectedType: string | null;
    setSelectedType: (name: string) => void;
    onNext: () => void;
}
