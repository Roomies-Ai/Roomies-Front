import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { householdApi } from '../../../api/household.api';

export const useHouseholdBase = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const currentUser = useAppSelector((state) => state.auth.user);
    const [household, setHousehold] = useState<any>(null);
    const [allHouseholds, setAllHouseholds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDetail = useCallback(async (isSilent = false) => {
        if (!id) return;
        try {
            if (!isSilent) setLoading(true);
            const [detail, all] = await Promise.all([
                householdApi.getHouseholdById(id),
                householdApi.getMyHouseholds()
            ]);
            setHousehold(detail);
            setAllHouseholds(all);
        } catch (err: any) {
            setError(err.message || 'Failed to load household details');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    return useMemo(() => ({
        id,
        navigate,
        currentUser,
        household,
        setHousehold,
        allHouseholds,
        loading,
        setLoading,
        error,
        setError,
        refresh: fetchDetail
    }), [id, navigate, currentUser, household, setHousehold, allHouseholds, loading, setLoading, error, setError, fetchDetail]);
};
