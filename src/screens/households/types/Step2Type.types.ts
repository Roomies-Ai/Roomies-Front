import type { HouseType } from '../../../api/houseType.api';

export interface Step2TypeProps {
    houseTypes: HouseType[];
    selectedTypeId: string | null;
    setSelectedTypeId: (id: string) => void;
    isFetchingTypes: boolean;
    onNext: () => void;
}
