import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { useGetHouseholdByIdQuery, useGetMyHouseholdsQuery } from '../../../api/household.api';

export const useHouseholdBase = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const currentUser = useAppSelector((state) => state.auth.user);
    
    const {
        data: householdData,
        isLoading: loadingDetail,
        error: detailError,
        refetch: refetchDetail,
    } = useGetHouseholdByIdQuery(id || '', { skip: !id });

    const {
        data: allHouseholdsData = [],
        isLoading: loadingAll,
        error: allError,
        refetch: refetchAll,
    } = useGetMyHouseholdsQuery();

    const [household, setHousehold] = useState<any>(null);
    const [allHouseholds, setAllHouseholds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Sync query results to local state for sub-hook compatibility
    useEffect(() => {
        if (householdData) {
            setHousehold(householdData);
        }
    }, [householdData]);

    useEffect(() => {
        if (allHouseholdsData) {
            setAllHouseholds(allHouseholdsData);
        }
    }, [allHouseholdsData]);

    useEffect(() => {
        setLoading(loadingDetail || loadingAll);
    }, [loadingDetail, loadingAll]);

    useEffect(() => {
        const err = detailError || allError;
        if (err) {
            setError('data' in err ? (err.data as any)?.message : 'message' in err ? err.message : 'Failed to load household details');
        } else {
            setError(null);
        }
    }, [detailError, allError]);

    const fetchDetail = useCallback(async (isSilent = false) => {
        if (!id) return;
        try {
            if (!isSilent) setLoading(true);
            await Promise.all([
                refetchDetail(),
                refetchAll()
            ]);
        } catch (err: any) {
            setError(err.message || 'Failed to load household details');
        } finally {
            setLoading(false);
        }
    }, [id, refetchDetail, refetchAll]);

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
