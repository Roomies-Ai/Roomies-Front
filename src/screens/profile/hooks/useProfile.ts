import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../../api/user.api';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setUser as setReduxUser } from '../../../store/slices/authSlice';
import type { ProfileUser, ProfileFormState } from '../types/profile.types';

export const useProfile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user: reduxUser } = useAppSelector(state => state.auth);
    
    const [user, setUser] = useState<ProfileUser | null>(reduxUser as ProfileUser);
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [editForm, setEditForm] = useState<ProfileFormState>({
        username: reduxUser?.username || '',
        email: reduxUser?.email || '',
        phoneNumber: reduxUser?.phoneNumber || '',
        vibes: reduxUser?.vibes || [],
        preferences: reduxUser?.preferences || { loudMusic: false }
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userApi.getMe();
                setUser(data);
                dispatch(setReduxUser(data)); // Sync with Redux & LocalStorage
                setEditForm({
                    username: data.username,
                    email: data.email,
                    phoneNumber: data.phoneNumber || '',
                    vibes: data.vibes || [],
                    preferences: data.preferences || { loudMusic: false }
                });
            } catch (err) {
                console.error('Failed to fetch user', err);
            }
        };
        fetchUser();
    }, [dispatch]);

    const handleUpdateProfile = useCallback(async () => {
        setLoading(true);
        try {
            const updated = await userApi.updateMe(editForm);
            setUser(updated);
            dispatch(setReduxUser(updated)); 
            setIsEditing(false);
        } catch (err) {
            console.error('Update failed', err);
        } finally {
            setLoading(false);
        }
    }, [editForm, dispatch]);

    const togglePreference = useCallback((key: string) => {
        setEditForm(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: !prev.preferences[key]
            }
        }));
    }, []);

    const addVibe = useCallback(() => {
        setEditForm(prev => {
            const vibe = prompt('Enter a new vibe (e.g. Night Owl, Clean Freak)');
            if (vibe && !prev.vibes.includes(vibe)) {
                return { ...prev, vibes: [...prev.vibes, vibe] };
            }
            return prev;
        });
    }, []);

    const removeVibe = useCallback((vibe: string) => {
        setEditForm(prev => ({ ...prev, vibes: prev.vibes.filter((v: string) => v !== vibe) }));
    }, []);

    const setEditFormField = useCallback((field: keyof ProfileFormState, value: any) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    }, []);

    return useMemo(() => ({
        user,
        setUser,
        isEditing,
        setIsEditing,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
        isTasksModalOpen,
        setIsTasksModalOpen,
        loading,
        editForm,
        setEditFormField,
        handleUpdateProfile,
        togglePreference,
        addVibe,
        removeVibe,
        navigate
    }), [user, setUser, isEditing, setIsEditing, isPasswordModalOpen, setIsPasswordModalOpen,
        isTasksModalOpen, setIsTasksModalOpen, loading, editForm, setEditFormField,
        handleUpdateProfile, togglePreference, addVibe, removeVibe, navigate]);
};
