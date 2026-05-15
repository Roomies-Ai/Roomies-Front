import type { Household } from '../../../types/household';

export interface HouseholdListProps {
    households: Household[];
    onNavigate: (id: string) => void;
    onLeave: (household: Household) => void;
}

export interface HomeActionButtonsProps {
    onCreateJoin: () => void;
    onHaveInviteCode: () => void;
}

export interface HomeErrorStateProps {
    error: string;
    onRetry: () => void;
}
