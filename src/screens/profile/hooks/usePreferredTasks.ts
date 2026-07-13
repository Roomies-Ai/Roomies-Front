import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { userApi } from '../../../api/user.api';
import type { TaskTypeOption } from '../types/preferredTasks.types';

export const usePreferredTasks = (isOpen: boolean, user: any, onUpdate: (updatedUser: any) => void, onClose: () => void) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [allTaskTypes, setAllTaskTypes] = useState<TaskTypeOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Read via a ref (not a hook dependency) so that unrelated updates to `user`
    // while the modal is open don't reset the selections the user is mid-edit on.
    const userRef = useRef(user);
    userRef.current = user;

    const fetchAvailableTypes = useCallback(async () => {
        setFetching(true);
        try {
            const data = await userApi.getAvailableTaskTypes();
            setAllTaskTypes(data);
        } catch (err) {
            console.error('Failed to fetch available tasks', err);
        } finally {
            setFetching(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            const ids = userRef.current?.preferredTaskTypes?.map((t: any) => t.id) || [];
            setSelectedIds(Array.from(new Set<string>(ids)));
            fetchAvailableTypes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, fetchAvailableTypes]);

    const filteredTypes = useMemo(() => {
        return allTaskTypes.filter(t => 
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.householdName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allTaskTypes, searchQuery]);

    const toggleType = useCallback((id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    }, []);

    const handleSave = useCallback(async () => {
        setLoading(true);
        try {
            const updated = await userApi.updatePreferredTasks(Array.from(new Set(selectedIds)));
            onUpdate(updated);
            onClose();
        } catch (err) {
            console.error('Failed to update preferences', err);
        } finally {
            setLoading(false);
        }
    }, [selectedIds, onUpdate, onClose]);

    return useMemo(() => ({
        selectedIds,
        loading,
        fetching,
        searchQuery,
        setSearchQuery,
        filteredTypes,
        toggleType,
        handleSave
    }), [selectedIds, loading, fetching, searchQuery, setSearchQuery, filteredTypes,
        toggleType, handleSave]);
};
