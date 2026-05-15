import { motion, AnimatePresence } from 'framer-motion';

// Components
import ChangePasswordHeader from './ChangePasswordHeader';
import ChangePasswordForm from './ChangePasswordForm';
import ChangePasswordSuccess from './ChangePasswordSuccess';

// Hooks
import { useChangePassword } from '../hooks/useChangePassword';

// Types
import type { ChangePasswordModalProps } from '../types/changePassword.types';

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
    const {
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
    } = useChangePassword(onClose);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-premium p-8 overflow-hidden"
                    >
                        {status === 'success' ? (
                            <ChangePasswordSuccess />
                        ) : (
                            <>
                                <ChangePasswordHeader onClose={onClose} />
                                <ChangePasswordForm 
                                    onSubmit={handleSubmit}
                                    oldPassword={oldPassword}
                                    setOldPassword={setOldPassword}
                                    newPassword={newPassword}
                                    setNewPassword={setNewPassword}
                                    confirmPassword={confirmPassword}
                                    setConfirmPassword={setConfirmPassword}
                                    loading={loading}
                                    status={status}
                                    errorMessage={errorMessage}
                                />
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ChangePasswordModal;
