import { useState, useEffect, useCallback, useMemo } from 'react';
import { householdApi } from '../../api/household.api';
import type { Household } from '../../types/household';

export const useHomeScreen = () => {
    const [households, setHouseholds] = useState<Household[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHouseholds = useCallback(async () => {
        try {
            setLoading(true);
            const data = await householdApi.getMyHouseholds();
            setHouseholds(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch households');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHouseholds();
    }, [fetchHouseholds]);

    return useMemo(() => ({
        households,
        loading,
        error,
        refresh: fetchHouseholds
    }), [households, loading, error, fetchHouseholds]);
};
