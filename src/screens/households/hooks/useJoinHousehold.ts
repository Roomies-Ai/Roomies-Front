import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJoinHouseholdMutation } from '../../../api/household.api';

export const useJoinHousehold = () => {
    const navigate = useNavigate();
    const [joinHousehold] = useJoinHouseholdMutation();
    const [inviteCode, setInviteCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleJoin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteCode.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            await joinHousehold({ inviteCode: inviteCode.trim() }).unwrap();
            navigate('/home');
        } catch (err: any) {
            setError(err.data?.message || err.message || 'Invalid invite code or already a member');
        } finally {
            setIsLoading(false);
        }
    }, [inviteCode, joinHousehold, navigate]);

    const handleBack = useCallback(() => navigate(-1), [navigate]);

    return {
        inviteCode,
        setInviteCode,
        isLoading,
        error,
        handleJoin,
        handleBack
    };
};
