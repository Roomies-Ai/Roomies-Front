import { useState, useEffect, useMemo } from 'react';
import { userApi } from '../../../api/user.api';
import type { TaskTypeOption } from '../types/preferredTasks.types';

export const usePreferredTasks = (isOpen: boolean, user: any, onUpdate: (updatedUser: any) => void, onClose: () => void) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [allTaskTypes, setAllTaskTypes] = useState<TaskTypeOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isOpen) {
            setSelectedIds(user?.preferredTaskTypes?.map((t: any) => t.id) || []);
            fetchAvailableTypes();
        }
    }, [isOpen, user]);

    const fetchAvailableTypes = async () => {
        setFetching(true);
        try {
            const data = await userApi.getAvailableTaskTypes();
            setAllTaskTypes(data);
        } catch (err) {
            console.error('Failed to fetch available tasks', err);
        } finally {
            setFetching(false);
        }
    };

    const filteredTypes = useMemo(() => {
        return allTaskTypes.filter(t => 
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.householdName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allTaskTypes, searchQuery]);

    const toggleType = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const updated = await userApi.updatePreferredTasks(selectedIds);
            onUpdate(updated);
            onClose();
        } catch (err) {
            console.error('Failed to update preferences', err);
        } finally {
            setLoading(false);
        }
    };

    return {
        selectedIds,
        loading,
        fetching,
        searchQuery,
        setSearchQuery,
        filteredTypes,
        toggleType,
        handleSave
    };
};
