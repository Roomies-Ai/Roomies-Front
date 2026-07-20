export interface Step2TypeProps {
    houseTypes: readonly string[];
    selectedType: string | null;
    setSelectedType: (name: string) => void;
    onNext: () => void;
}
