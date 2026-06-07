import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials, setLoading, setError } from '../../store/slices/authSlice';
import { useGoogleLoginMutation, useRegisterMutation, useLoginMutation } from '../../api/auth.api';
import { useGoogleLogin as useReactGoogleLogin } from '@react-oauth/google';

export const useLoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [authType, setAuthType] = useState<'login' | 'signup'>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [googleLogin, { isLoading: googleIsLoading }] = useGoogleLoginMutation()
    const [register, { isLoading: registerIsLoading }] = useRegisterMutation()
    const [login, { isLoading: loginIsLoading }] = useLoginMutation()

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(registerIsLoading || loginIsLoading));
        dispatch(setError(null));

        try {
            const data = { email, password };
            const response = authType === 'login'
                ? await login(data).unwrap()
                : await register(data).unwrap();

            dispatch(setCredentials({
                user: response.user,
                token: response.accessToken
            }));

            navigate('/home');

        } catch (err: any) {
            const message = err.response?.data?.message || err.message || 'Authentication failed';
            dispatch(setError(message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [email, password, authType, dispatch, navigate]);

    const toggleAuthType = useCallback((type: 'login' | 'signup') => {
        setAuthType(type);
    }, []);

    const toggleShowPassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const onGoogleSuccess = useCallback(async (tokenResponse: any) => {
        dispatch(setLoading(googleIsLoading));
        dispatch(setError(null));
        try {
            const response = await googleLogin({ token: tokenResponse.access_token }).unwrap();
            dispatch(setCredentials({
                user: response.user,
                token: response.accessToken
            }));
            navigate('/home');
        } catch (err: any) {
            dispatch(setError(err.response?.data?.message || err.message || 'Google login failed'));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, navigate]);

    const onGoogleError = useCallback(() => {
        dispatch(setError('Google login failed'));
    }, [dispatch]);

    const handleGoogleLogin = useReactGoogleLogin({
        onSuccess: onGoogleSuccess,
        onError: onGoogleError
    });

    return {
        authType,
        showPassword,
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        handleGoogleLogin,
        toggleAuthType,
        toggleShowPassword,
        navigate
    };
};
