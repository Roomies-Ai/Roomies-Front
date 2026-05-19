import { useState } from 'react';
import { userApi } from '../../../api/user.api';

export const useChangePassword = (onClose: () => void) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setStatus('error');
            setErrorMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await userApi.changePassword({ oldPassword, newPassword });
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }, 2000);
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        status,
        errorMessage,
        handleSubmit
    };
};
