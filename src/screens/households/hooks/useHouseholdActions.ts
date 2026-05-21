import { useState, useCallback, useMemo } from 'react';
import { householdApi } from '../../../api/household.api';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/slices/authSlice';

export const useHouseholdActions = (id: string | undefined, currentUser: any, navigate: any, setLoading: any, setError: any) => {
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleLeaveHousehold = useCallback(() => {
        setIsLeaveModalOpen(true);
    }, []);

    const handleConfirmLeave = useCallback(async () => {
        if (!id || !currentUser) return;
        
        try {
            setLoading(true);
            setIsLeaveModalOpen(false);
            const userId = currentUser.id || currentUser.userId;
            await householdApi.leaveHousehold(id, userId);
            
            const updatedUser = { ...currentUser };
            if (updatedUser.households) {
                updatedUser.households = updatedUser.households.filter((h: any) => h.id !== id);
            }
            dispatch(setUser(updatedUser));
            
            navigate('/home', { replace: true });
        } catch (err: any) {
            console.error('Failed to leave household:', err);
            setError(err.message || 'Failed to leave household');
            setLoading(false);
        }
    }, [id, currentUser, dispatch, navigate, setLoading, setError]);

    return useMemo(() => ({
        isLeaveModalOpen,
        setIsLeaveModalOpen,
        handleLeaveHousehold,
        handleConfirmLeave
    }), [isLeaveModalOpen, setIsLeaveModalOpen, handleLeaveHousehold, handleConfirmLeave]);
};
