import { useState, useCallback, useMemo } from 'react';
import { useLeaveHouseholdMutation } from '../../../api/household.api';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/slices/authSlice';

export const useHouseholdActions = (id: string | undefined, currentUser: any, navigate: any, setLoading: any, setError: any) => {
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [leaveHousehold] = useLeaveHouseholdMutation();

    const handleLeaveHousehold = useCallback(() => {
        setIsLeaveModalOpen(true);
    }, []);

    const handleConfirmLeave = useCallback(async () => {
        if (!id || !currentUser) return;
        
        try {
            setLoading(true);
            setIsLeaveModalOpen(false);
            const userId = currentUser.id || currentUser.userId;
            await leaveHousehold({ householdId: id, userId }).unwrap();
            
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
    }, [id, currentUser, dispatch, navigate, leaveHousehold, setLoading, setError]);

    return useMemo(() => ({
        isLeaveModalOpen,
        setIsLeaveModalOpen,
        handleLeaveHousehold,
        handleConfirmLeave
    }), [isLeaveModalOpen, setIsLeaveModalOpen, handleLeaveHousehold, handleConfirmLeave]);
};
