import { useState } from 'react';
import { householdApi } from '../../../api/household.api';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/slices/authSlice';

export const useHouseholdActions = (id: string | undefined, currentUser: any, navigate: any, setLoading: any, setError: any) => {
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleLeaveHousehold = () => {
        setIsLeaveModalOpen(true);
    };

    const handleConfirmLeave = async () => {
        if (!id || !currentUser) return;
        
        try {
            setLoading(true);
            setIsLeaveModalOpen(false);
            const userId = currentUser.id || currentUser.userId;
            await householdApi.leaveHousehold(id, userId);
            
            // Update local user state to reflect they left this household
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
    };

    return {
        isLeaveModalOpen,
        setIsLeaveModalOpen,
        handleLeaveHousehold,
        handleConfirmLeave
    };
};
