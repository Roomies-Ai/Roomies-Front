import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export const useHouseHolds = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const handleCreateOrJoin = useCallback(() => {
    console.log('Navigate to Create or Join');
    // Implement navigation logic here
  }, []);

  const handleInviteCode = useCallback(() => {
    console.log('Open Invite Code Modal');
    // Implement modal logic here
  }, []);

  return {
    user: user || { name: 'Alex', avatar: null }, // Fallback for testing
    loading,
    handleCreateOrJoin,
    handleInviteCode,
  };
};
