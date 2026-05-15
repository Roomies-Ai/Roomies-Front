import React from 'react';
import { motion } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';
import type { ChangePasswordFormProps } from '../types/changePassword.types';

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
    onSubmit,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    status,
    errorMessage
}) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <Lock size={18} className="text-slate-400" />
                    <input 
                        type="password"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 w-full"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <Lock size={18} className="text-slate-400" />
                    <input 
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 w-full"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <Lock size={18} className="text-slate-400" />
                    <input 
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 w-full"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            {status === 'error' && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-50 text-red-500 rounded-xl text-xs font-bold border border-red-100"
                >
                    <AlertCircle size={14} />
                    {errorMessage}
                </motion.div>
            )}

            <button 
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-primary text-white py-4 rounded-2xl font-black shadow-premium active:scale-95 transition-all disabled:opacity-50"
            >
                {loading ? 'Updating...' : 'Update Password'}
            </button>
        </form>
    );
};

export default ChangePasswordForm;
