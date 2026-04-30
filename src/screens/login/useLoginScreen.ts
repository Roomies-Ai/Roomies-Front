import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials, setLoading, setError } from '../../store/slices/authSlice';

export const useLoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [authType, setAuthType] = useState<'login' | 'signup'>('login');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));

        try {
            // Simulate API call
            setTimeout(() => {
                const mockUser = { id: '1', name: 'User', email: 'hello@roomies.com' };
                const mockToken = 'mock-jwt-token';

                dispatch(setCredentials({ user: mockUser, token: mockToken }));
                dispatch(setLoading(false));
                navigate('/home');
            }, 1000);
        } catch (err: any) {
            dispatch(setError(err.message || 'Authentication failed'));
        }
    };

    const toggleAuthType = (type: 'login' | 'signup') => {
        setAuthType(type);
    };

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return {
        authType,
        showPassword,
        handleSubmit,
        toggleAuthType,
        toggleShowPassword,
        navigate
    };
};
