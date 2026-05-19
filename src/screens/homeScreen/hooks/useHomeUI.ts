import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setUser } from '../../../store/slices/authSlice';
import { householdApi } from '../../../api/household.api';
import type { Household } from '../../../types/household';

export const useHomeUI = (onRefresh?: () => void) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.auth.user);
    
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [householdToLeave, setHouseholdToLeave] = useState<Household | null>(null);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (isLeaveModalOpen) {
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isLeaveModalOpen]);

    const handleCreateJoin = () => navigate('/households/new');
    const handleJoinWithCode = () => navigate('/households/join');
    const handleNavigateToHousehold = (id: string) => navigate(`/households/${id}`);

    const handleLeaveHousehold = (household: Household) => {
        setHouseholdToLeave(household);
        setIsLeaveModalOpen(true);
    };

    const handleConfirmLeave = async () => {
        if (!householdToLeave || !currentUser) return;
        
        try {
            setIsLeaving(true);
            const userId = currentUser.id || currentUser.userId;
            await householdApi.leaveHousehold(householdToLeave.id, userId);
            
            // Update local user state
            const updatedUser = { ...currentUser };
            if (updatedUser.households) {
                updatedUser.households = updatedUser.households.filter((h: any) => h.id !== householdToLeave.id);
            }
            dispatch(setUser(updatedUser));
            
            setIsLeaveModalOpen(false);
            setHouseholdToLeave(null);
            if (onRefresh) onRefresh();
        } catch (err) {
            console.error('Failed to leave household:', err);
        } finally {
            setIsLeaving(false);
        }
    };

    return {
        handleCreateJoin,
        handleJoinWithCode,
        handleNavigateToHousehold,
        handleLeaveHousehold,
        handleConfirmLeave,
        isLeaveModalOpen,
        setIsLeaveModalOpen,
        householdToLeave,
        isLeaving
    };
};
