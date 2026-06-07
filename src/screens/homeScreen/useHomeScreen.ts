import { useMemo } from 'react';
import { useGetMyHouseholdsQuery } from '../../api/household.api';

export const useHomeScreen = () => {
    const { data: households = [], isLoading: loading, error, refetch: refresh } = useGetMyHouseholdsQuery();

    const errorMsg = error 
        ? ('data' in error ? (error.data as any)?.message : 'message' in error ? error.message : 'Failed to fetch households')
        : null;

    return useMemo(() => ({
        households,
        loading,
        error: errorMsg,
        refresh
    }), [households, loading, errorMsg, refresh]);
};
