import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { householdApi } from '../../../api/household.api';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setUser } from '../../../store/slices/authSlice';

export const useJoinHousehold = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);
    const [inviteCode, setInviteCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleJoin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteCode.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const household = await householdApi.joinHousehold({ inviteCode: inviteCode.trim() });
            
            if (user) {
                const updatedUser = {
                    ...user,
                    households: [...(user.households || []), { id: household.id, name: household.name }]
                };
                dispatch(setUser(updatedUser));
            }

            navigate('/home');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid invite code or already a member');
        } finally {
            setIsLoading(false);
        }
    }, [inviteCode, navigate]);

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
