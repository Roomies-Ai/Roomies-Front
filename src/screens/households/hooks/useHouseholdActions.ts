import { useState } from 'react';
import { householdApi } from '../../../api/household.api';

export const useHouseholdActions = (id: string | undefined, currentUser: any, navigate: any, setLoading: any, setError: any) => {
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

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
            navigate('/home');
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
