export interface JoinHouseholdFormProps {
    inviteCode: string;
    setInviteCode: (code: string) => void;
    isLoading: boolean;
    error: string | null;
    onJoin: (e: React.FormEvent) => void;
}
