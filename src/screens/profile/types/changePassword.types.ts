export interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ChangePasswordFormProps {
    onSubmit: (e: React.FormEvent) => void;
    oldPassword: string;
    setOldPassword: (val: string) => void;
    newPassword: string;
    setNewPassword: (val: string) => void;
    confirmPassword: string;
    setConfirmPassword: (val: string) => void;
    loading: boolean;
    status: 'idle' | 'success' | 'error';
    errorMessage: string;
}
