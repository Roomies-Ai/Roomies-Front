import React from 'react';

interface LoginToggleProps {
    authType: 'login' | 'signup';
    onToggle: (type: 'login' | 'signup') => void;
}

const LoginToggle: React.FC<LoginToggleProps> = ({ authType, onToggle }) => {
    return (
        <div className="mb-8">
            <div className="flex h-12 w-full items-center justify-center rounded-full bg-input-bg dark:bg-[#1f2b36] p-1.5">
                <label
                    className={`group flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 transition-all duration-200 ${authType === 'login' ? 'bg-white dark:bg-[#2c3b4a] shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : ''}`}
                    onClick={() => onToggle('login')}
                >
                    <span className={`truncate text-sm font-bold ${authType === 'login' ? 'text-charcoal dark:text-white' : 'text-medium-gray dark:text-[#94a3b8]'}`}>Log In</span>
                    <input checked={authType === 'login'} className="invisible w-0 h-0 absolute" name="auth_type" type="radio" value="login" readOnly />
                </label>
                <label
                    className={`group flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 transition-all duration-200 ${authType === 'signup' ? 'bg-white dark:bg-[#2c3b4a] shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : ''}`}
                    onClick={() => onToggle('signup')}
                >
                    <span className={`truncate text-sm font-bold ${authType === 'signup' ? 'text-charcoal dark:text-white' : 'text-medium-gray dark:text-[#94a3b8]'}`}>Sign Up</span>
                    <input checked={authType === 'signup'} className="invisible w-0 h-0 absolute" name="auth_type" type="radio" value="signup" readOnly />
                </label>
            </div>
        </div>
    );
};

export default LoginToggle;
