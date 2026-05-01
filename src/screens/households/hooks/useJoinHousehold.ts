import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { householdApi } from '../../../api/household.api';

export const useJoinHousehold = () => {
    const navigate = useNavigate();
    const [inviteCode, setInviteCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteCode.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            await householdApi.joinHousehold({ inviteCode: inviteCode.trim() });
            navigate('/home');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid invite code or already a member');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => navigate(-1);

    return {
        inviteCode,
        setInviteCode,
        isLoading,
        error,
        handleJoin,
        handleBack
    };
};
